import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_TYPES } from "./category.types";

//regular actions
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error);

//A thunk action that triggers the corresponding actions. Redux recommends to include Async at the end of the name.
//This thunk is a function that returns a function that gets a dispatch and can also be async.
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };
