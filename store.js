function createSotore(reducer) {
  let currentState = reducer(undefined, {});

  return {
    getState: () => currentState,
    dispatch: action => {
      currentState = reducer(currentState, action)
    }
  }
}

const initialState = {
  favorites: []
}

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
        const favorites = [...state.favorites, action.payload.favorite];
      return { favorites };
    }
    case "REMOVE_FAVORITE":{
      const removedFavorite = action.payload.favorite;
      const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
      return { favorites };
    }
    default: return state;
  }
}

const store = createSotore(favoritesReducer);

export default store;
