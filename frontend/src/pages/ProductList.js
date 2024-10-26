import Productlistcomp from "./components/Productlistcomp";
import axios from "axios";

const getpro = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/products");
  // console.log(response.data);
  return data;
};
function ProductList() {
  return <Productlistcomp getpro={getpro} />;
}

export default ProductList;
