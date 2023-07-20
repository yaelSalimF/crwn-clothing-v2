import { CATEGORIES_TYPES } from "./category.types";

export const INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
