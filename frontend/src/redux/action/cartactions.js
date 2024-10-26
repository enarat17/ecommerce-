//import * as actionTypes from "../consts/cartconst";
import axios from "axios";

export const addtocart =
  (productid, Quantity) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/get_one/${productid}`,
        {
          withCredentials: true,
        }
      );

      console.log(data.data);

      dispatch({
        type: "ADD_TO_CART",
        payload: {
          productid: data.data._id,
          name: data.data.name,
          price: data.data.price,
          image: data?.data?.images.length > 0 ? data.data.images[0] : null,
          Quantity: Number(Quantity),
          totalprice: data.data.price * Number(Quantity),
          count: data.data.count,
        },
      });
      console.log(getState());
      localStorage.setItem("cart", JSON.stringify(getState().cart.cartitems));
    } catch (err) {
      console.log(err);
    }
  };

export const delete_item_action =
  (productid, Quantity, price) => (dispatch, getState) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: {
        productid: productid,
        Quantity: Quantity,
        price: price,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartitems));
  };
export const remove_all_cart = () => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_ALL_CART",
    payload: [],
  });
  localStorage.removeItem("cart");
};
