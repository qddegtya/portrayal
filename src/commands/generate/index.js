// @Warning: 使用 npm run cf-add 将自动使用本内容模板生成命令行模块
// @@ 因此，不要改动和删除此文件 @@

const BC = require("@atools/cf").BC;
const AJS = require("xajs");
import getRecentPosts from "../../portrayal-units/recent-posts";
import TwoColRecentPostsForGithubProfile from "../../portrayal-cards/recent-posts/two-column-github-profile";
import YAML from "yaml";
import path from "node:path";
import fs from "node:fs";

const cwd = process.cwd();

export default class Generate extends BC {
  static command = "generate";
  static alias = "ge";
  static description = "generate with portrayal unit";

  _loadConfigFile(rootDir) {
    const _readFile = (name) =>
      fs.readFileSync(path.join(rootDir, name), "utf-8");

    // 按照优先级依次加载配置
    const _load = AJS.functional.helper.tryNext(() => {
      this.configFile = _readFile(".portrayal.yml");
    });

    _load
      .tryNext(() => {
        this.configFile = _readFile(".portrayal.json");
      })
      .tryNext(() => {
        this.configFile = _readFile("portrayal.config.yml");
      })
      .tryNext(() => {
        this.configFile = _readFile("portrayal.config.json");
      });

    // load
    _load();

    if (!this.configFile) throw new Error("Config file not found.");
  }

  init(commander) {
    this.commander = commander;
    this.commander.option(
      "-o, --output <dir>",
      "output dir",
      path.join(cwd, ".portrayal")
    );

    try {
      this._loadConfigFile(cwd);
    } catch (error) {
      console.log("Load config file failed.");
      process.exit(1);
    }

    this.config = YAML.parse(this.configFile)["portrayal"];
  }

  async do() {
    const { yuque: yuqueRecentPosts, blog: blogRecentPosts } =
      await getRecentPosts(
        this.config["units"]["@atools/portrayal-units-recent-posts"]
      );

    const twoColumnGithubProfileConfig =
      this.config["cards"]["@atools/portrayal-cards-recent-posts"][
        "two-column-github-profile"
      ];

    const twoColRecentPostsForGithubProfile = TwoColRecentPostsForGithubProfile(
      {
        left: {
          emoji: twoColumnGithubProfileConfig.left.emoji,
          posts: yuqueRecentPosts.data.body.map((post) => {
            return {
              title: post.title,
              date: post.updated_at,
              link: post.url,
            };
          }),
          title: twoColumnGithubProfileConfig.left.title,
          link: twoColumnGithubProfileConfig.left.link,
        },
        right: {
          emoji: twoColumnGithubProfileConfig.right.emoji,
          posts: blogRecentPosts.data.body.map((post) => {
            return {
              title: post.title,
              date: post.date,
              link: post.link,
            };
          }),
          title: twoColumnGithubProfileConfig.right.title,
          link: twoColumnGithubProfileConfig.right.link,
        },
      }
    );

    const outputDir = this.commander.opts().output;
    await fs.mkdirSync(outputDir);
    await fs.writeFileSync(
      path.join(outputDir, ".twoColRecentPostsForGithubProfile.markdown"),
      twoColRecentPostsForGithubProfile
    );
  }
}
