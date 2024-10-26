import axios from "axios";
import Productspage from "./components/Productspage";

const getproducts = async (abctrl) => {
  // "http://localhost:5000/api/v1/products"
  // "http://localhost:5000/api/v1/products/admin"
  const { data } = await axios.get(
    "http://localhost:5000/api/v1/products",
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    },
    {
      signal: abctrl.signal,
    }
  );
  return data;
};
const deleteproduct = async (productid) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/v1/products/admin/${productid}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};
function AdminProductPage() {
  return (
    <Productspage getproducts={getproducts} deleteproduct={deleteproduct} />
  );
}

export default AdminProductPage;
