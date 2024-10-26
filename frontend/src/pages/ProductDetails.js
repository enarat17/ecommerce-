import axios from "axios";
import Productdetailscomp from "./components/Productdetailscomp";

const getproductdetails = async (productid) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/products/get_one/${productid}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

function ProductDetails() {
  return <Productdetailscomp getproductdetails={getproductdetails} />;
}

export default ProductDetails;
