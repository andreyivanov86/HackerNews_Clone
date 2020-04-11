export default function Comment(comment) {
  // console.log(comment)
  return `
  <div>
    <div class="comment-header ">
      <span class="gray">${comment.index}</span>
      <span class="upvote">▲</span>
      <a href="${comment.user}">${comment.user}</a>
      <span>${comment.time_ago}</span>
    </div>
    <div class="comment-text">
      ${comment.content}
    </div>
  </div>`
}
