import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from "../shop-data.js";
// import { addCollectionAndDocuments } from "../utils/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

// as the actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: [],
  setCategoriesMap: () => null,
});

// as the actual component
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // Remove this. It was only meant to be run once to populate the firebase db
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  // console.log(value);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
