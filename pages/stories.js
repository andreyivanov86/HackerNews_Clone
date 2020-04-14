import View from "../utils/view.js";
import Story from "../components/Story.js";
import baseUrl from "../utils/base_url.js";
import store from "../store.js";
import checkFavorite from "../utils/check_favorite.js";

export default async function Stories(path) {
  const {favorites} = store.getState();
  console.log(favorites);
  const stories = await getStories(path);
  const hasStories = stories.length > 0;

  View.innerHTML = `
  <div>
  ${
    hasStories ? stories.map((story, index) => Story({...story, index: index + 1, isFavorite: checkFavorite(favorites, story)})).join('') : "No stories"
  }
  </div>`;

  document.querySelectorAll('.favorite').forEach( favoriteBtn => {
    favoriteBtn.addEventListener('click', async function() {
      const story = JSON.parse(this.dataset.story);
      const isFavorite = checkFavorite(favorites, story);
        store.dispatch({type: `${isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE"}`, payload: {favorite: story}})

      await Stories(path);
    })
  });
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
