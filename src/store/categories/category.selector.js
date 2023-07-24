import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);
export const selectCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesInfo = createSelector(
  [selectCategories],
  (categories) =>
    categories.map((category, index) => {
      const { title, items } = category;
      const imageUrl = items[0].imageUrl;
      return { id: index, title, imageUrl };
    })
);
