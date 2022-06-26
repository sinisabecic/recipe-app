export const initialState = {
  recipesRandom: localStorage.getItem("recipesRandom")
    ? JSON.parse(localStorage.getItem("recipesRandom"))
    : "",
  recipesVegetarian: localStorage.getItem("recipesVegetarian")
    ? JSON.parse(localStorage.getItem("recipesVegetarian"))
    : "",
};

//! Nista ovo
export const recipeReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPES_RANDOM":
      return { ...state.recipesRandom };
    case "GET_RECIPES_VEGETARIAN":
      return { ...state.recipesVegetarian };
    default:
      return state;
  }
};
