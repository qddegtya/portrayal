// @Warning: 使用 npm run cf-add 将自动使用本内容模板生成命令行模块
// @@ 因此，不要改动和删除此文件 @@

const BC = require("@atools/cf").BC;
const GitlabPlugin = require("../../portrayal-units/gitlab").default;

export default class Generate extends BC {
  static command = "generate";
  static alias = "ge";
  static description = "genereate with portrayal unit";

  init(commander) {}

  async do() {
    const api = await GitlabPlugin();
    const events = await api.Users.events(1192);

    const commit = await api.Commits.show(4800, 'f0564f8c5997a24eddbb6fe38cff9d0e21543c03');

    console.log(commit);

    const counts = events
      .filter((event) => {
        return event["push_data"] && event["push_data"]["commit_count"];
      })
      .map((event) => {
        const projectId = event['project_id'];

        // console.log(commit)

        return event;
      })
      .reduce((pre, currentCommit) => {
        // console.log(currentCommit)

        return pre + currentCommit["push_data"]["commit_count"];
      }, 0);

    console.log(counts);
  }
}
