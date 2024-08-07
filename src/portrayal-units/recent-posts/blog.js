import { extract } from "@extractus/feed-extractor";
import dayjs from "dayjs";

const YMD = (date) => dayjs(date).format("YYYY-MM-DD");

// 返回订阅地址最近文章列表
export default async ({ atomOrFeedsUrl = "" } = {}) => {
  const { entries = [], title, description } = await extract(atomOrFeedsUrl);

  return {
    type: "recent-posts",
    data: {
      header: {
        name: title,
        avatar_url: "",
        description,
      },
      body: entries.map((entry) => {
        return {
          title: entry.title,
          link: entry.link,
          date: YMD(entry.published)
        }
      }),
      footer: {},
    },
  };
};
