import AdminCreateproductpage from "./AdminCreateproductpage";
import axios from "axios";

const createProduct = async (productdata) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/v1/products/admin_create_one`,
    { ...productdata },
    {
      withCredentials: true,
    }
  );
  console.log(data);
  return data;
};
const uploadimag = async (images, productid) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/products/admin_uplad?productid=" + productid,
    formData,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

function AdminCreateProduct() {
  return (
    <AdminCreateproductpage
      createProduct={createProduct}
      uploadimag={uploadimag}
    />
  );
}

export default AdminCreateProduct;
