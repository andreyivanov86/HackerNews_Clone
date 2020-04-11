import View from "../utils/view.js";
import Comment from "../components/Comment.js";
import Story from "../components/Story.js";
import baseUrl from "../utils/base_url.js";

export default async function Item(path) {
  let story = null;
  let comments = null;
  let hasComments = false;
  let hasError = false;

  try {
    story = await getComments();
    comments = story.comments;
    hasComments = comments.length > 0;
  } catch(error) {
    hasError = true;
    console.error("Wrong Item index", error);
  }

  if (hasError) { View.innerHTML = `<div class="error">Error fetching story</div>`}

  View.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <div>
      ${
        hasComments ? comments.map((comment, index) => Comment({...comment, index: index + 1})).join('') : "No comments"
      }
    </div>`;
}

async function getComments() {
  const storyID = window.location.hash.slice(10);
  const response = await axios.get(`${baseUrl}/item/${storyID}`);
  return response.data;
}
