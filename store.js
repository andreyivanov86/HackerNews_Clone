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

// const action1 = { type: "ADD_FAVORITE", payload: {favorite: {title: 'story1', id: 1}}};
// const action2 = { type: "ADD_FAVORITE", payload: {favorite: {title: 'story2', id: 2}}};
// const action3 = { type: "REMOVE_FAVORITE", payload: {favorite: {title: 'story1', id: 1}}};

const store = createSotore(favoritesReducer);
// store.dispatch(action1);
// store.dispatch(action2);
// store.dispatch(action3);
// console.log(store.getState());

export default store;
