import AdminEditproductpage from "./AdminEditproductpage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Save_Attr } from "../redux/action/catrgoriesactions";

import axios from "axios";

const fetch_product = async (id) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/products/get_one/${id}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

const deleteimagefunc = async (imagepath, productid) => {
  let imagepath_encode = encodeURIComponent(imagepath);
  const { data } = await axios.delete(
    `http://localhost:5000/api/v1/products/admin/image/${imagepath_encode}/${productid}`,
    { withCredentials: true }
  );
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
function AdminEditProduct() {
  const dispatch = useDispatch();

  const { category_data } = useSelector(
    (state) => state.all_category.categories
  );
  console.log(category_data);

  // GET ALL DATA FOR EDIT PRODUCT
  const updatae_edit_product = async (productid, forminput) => {
    console.log(productid, forminput);
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/products/admin_update_one/${productid}`,
      { ...forminput },
      {
        withCredentials: true, // This line ensures cookies are sent with the request
      }
    );
    return data;
  };
  return (
    <AdminEditproductpage
      category_data={category_data}
      fetch_product={fetch_product}
      updatae_edit_product={updatae_edit_product}
      Save_Attr={Save_Attr}
      dispatch={dispatch}
      deleteimagefunc={deleteimagefunc}
      uploadimag={uploadimag}
    />
  );
}

export default AdminEditProduct;
