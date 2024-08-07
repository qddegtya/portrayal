import getYuqueRecentPosts from "./yuque";
import getBlogRecentPosts from "./blog";

export default async (config) => {
  return {
    yuque: await getYuqueRecentPosts(config.yuque),
    blog: await getBlogRecentPosts(config.blog),
  };
};
