import { useSelector } from "react-redux";
import Directory from "../../components/directory/directory.component";
import { selectCategoriesInfo } from "../../store/categories/category.selector";

const Home = () => {
  const categories = useSelector(selectCategoriesInfo);

  return categories ? (
    <Directory categories={categories} />
  ) : (
    <h2>Loading...</h2>
  );
};

export default Home;
