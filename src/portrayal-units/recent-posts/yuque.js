import Yuque from "@yuque/sdk";
import dayjs from "dayjs";

const YUQUE_HOME = `https://www.yuque.com`;
const YMD = (date) => dayjs(date).format("YYYY-MM-DD");

// 返回语雀最近文章
export default async ({
  token = process.env.YUQUE_TOKEN || "",
  includeRepos = [],
  nums = 5,
} = {}) => {
  let latestPosts = [];

  // 初始化 yuque sdk
  const yuque = new Yuque({
    token,
  });

  // 获取用户
  const { id, login, name, avatar_url, description } = await yuque.users.get();

  // 获取 repos
  const repos = (
    await yuque.repos.list({
      user: id,
    })
  ).map((item) => {
    return item;
  });

  // 获得 repo 下的最新文章
  (
    await Promise.all(
      repos.map(async (repo) => {
        return {
          repo,
          docs: await yuque.docs.list({
            namespace: repo.id,
          }),
        };
      })
    )
  )
    .filter((repoDocs) => {
      return includeRepos.includes(repoDocs.repo.slug);
    })
    .forEach((repoDocs) => {
      const latestDocs = repoDocs.docs.slice(0, nums);
      const repo = repoDocs.repo;

      if (latestDocs.length > 0) {
        latestDocs.forEach((latestDoc) => {
          latestPosts.push({
            id: latestDoc.id,
            title: latestDoc.title,
            description: latestDoc.description,
            url: `${YUQUE_HOME}/${login}/${repo.slug}/${latestDoc.slug}`,
            created_at: YMD(latestDoc.created_at),
            updated_at: YMD(latestDoc.updated_at),
            content_updated_at: YMD(latestDoc.content_updated_at),
            published_at: YMD(latestDoc.published_at),
            first_published_at: YMD(latestDoc.first_published_at),
          });
        });
      }
    });

  return {
    type: "recent-posts",
    data: {
      header: {
        name,
        avatar_url,
        description,
      },
      body: latestPosts,
      footer: {},
    },
  };
};
