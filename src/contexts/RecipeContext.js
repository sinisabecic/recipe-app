import { useReducer, createContext, useEffect, useState } from "react";
import { recipeReducer, initialState } from "../reducers/recipeReducer";

export const RecipeContext = createContext(initialState);

export const RecipeContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(recipeReducer, initialState);

  //* Ovo je sasvim dovoljno
  const state = initialState;

  //Nije neka nuzda ovo
  useEffect(() => {
    localStorage.setItem("recipesRandom", JSON.stringify(state.recipesRandom));
    localStorage.setItem(
      "recipesVegetarian",
      JSON.stringify(state.recipesVegetarian)
    );
  }, [state]);

  //action
  // const getRecipesRandom = () => {
  //   dispatch({ type: "GET_RECIPES_RANDOM" });
  // };

  // const getRecipesVegetarian = () => {
  //   dispatch({ type: "GET_RECIPES_VEGETARIAN" });
  // };

  return (
    <RecipeContext.Provider
      value={{
        recipesRandom: state.recipesRandom, //? napravljen je uslov u recipeReducer za ovo. initialState.recipesRandom
        recipesVegetarian: state.recipesVegetarian,
        // getRecipesRandom,
        // getRecipesVegetarian,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
