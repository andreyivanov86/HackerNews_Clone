import View from "../utils/view.js";
import store from "../store.js";
import Story from "../components/Story.js";

export default async function Favorites() {
  const { favorites } = store.getState();
  const hasFavorites = favorites.length > 0;

  View.innerHTML = `
  <div>
    ${hasFavorites ? favorites.map(favoriteStory => Story({...favoriteStory, isFavorite: true})).join("") : "Add some Favorites"}
  </div>`;

  document.querySelectorAll(".favorite")
    .forEach( favoriteBtn =>  favoriteBtn.addEventListener('click', event => {
      const story = JSON.parse(event.target.dataset.story);
      store.dispatch({type: "REMOVE_FAVORITE", payload: {favorite: story}});
      Favorites();
    })
  )

}
