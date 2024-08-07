export default ({
  left = {
    emoji: "",
    title: "",
    link: "",
    posts: [],
  },
  right = {
    emoji: "",
    title: "",
    link: "",
    posts: [],
  },
} = {}) => {
  const leftPosts = left.posts.map((post) => {
    return `* <a href='${post.link}' target='_blank'>${post.title}</a> - ${post.date}`;
  });

  const rightPosts = right.posts.map((post) => {
    return `* <a href='${post.link}' target='_blank'>${post.title}</a> - ${post.date}`;
  });

  return `
    <table width="960px;">
      <tr>
      <td valign="top" width="50%">

      #### ${left.emoji} <a href="${left.link}" target="_blank">${
    left.title
  }</a>

      ---

      ${leftPosts.join("\n")}
      
      <br />

      </td>
      <td valign="top" width="50%">

      #### ${right.emoji} <a href="${right.link}" target="_blank">${
    right.title
  }</a>

      ---

      ${rightPosts.join("\n")}

      </td>
      </tr>
    </table>
  `;
};
