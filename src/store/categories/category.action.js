import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_TYPES } from "./category.types";

export const setCategories = (categories) =>
  createAction(CATEGORIES_TYPES.SET_CATEGORIES, categories);
