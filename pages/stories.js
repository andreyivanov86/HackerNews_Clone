import View from "../utils/view.js";
import Story from "../components/Story.js";
import baseUrl from "../utils/base_url.js";

export default async function Stories(path) {
  const stories = await getStories(path);
  const hasStories = stories.length > 0;

  View.innerHTML = `
  <div>
  ${
    hasStories ? stories.map((story, index) => Story({...story, index: index + 1})).join('') : "No stories"
  }
  </div>`;

}

async function getStories(path) {
  const isHomeRoute = path === '/';
  const isNewsRoute = path ==='/new';
  if (isHomeRoute) {
    path = '/news'
  } else if (isNewsRoute) {
    path = '/newest'
  }

  const response = await axios.get(`${baseUrl}${path}`)
  const stories = response.data;
  return stories;
}
