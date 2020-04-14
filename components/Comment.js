export default function Comment(comment) {
  // console.log(comment)
  const hasNestedComment = comment.comments.length > 0;
  return `
  <div class="nested-comments-${comment.level}">
    <p class="comment-header ">
      <span class="upvote">▲</span>
      <a href="${comment.user}">${comment.user} </a>
      <span>| ${comment.time_ago}</span>
    </p>
    <div class="comment-text">
      ${comment.content}
      ${hasNestedComment ? comment.comments.map( comment => Comment(comment)).join("") : ""}
    </div>
  </div>`
}
