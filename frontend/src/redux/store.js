import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { cartreducer } from "./reducters/cartreducer";
import { userreducer } from "./reducters/usersreducer";
import { get_categories } from "./reducters/categoris_reducer";

const userinformation = localStorage.getItem("userinfo")
  ? JSON.stringify(localStorage.getItem("userinfo"))
  : sessionStorage.getItem("userinfo")
  ? JSON.stringify(sessionStorage.getItem("userinfo"))
  : {};

const cartinformation = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const reducers = combineReducers({
  cart: cartreducer,
  user: userreducer,
  all_category: get_categories, // Add your category reducer here
});
const intialstate = {
  cart: {
    cartitems: cartinformation,
    itemscounts: cartinformation
      ? cartinformation.reduce(
          (Quantity, item) => Number(item.Quantity) + Quantity,
          0
        )
      : 0,
    cartsubtotal: cartinformation
      ? cartinformation.reduce(
          (price, item) => price + Number(item.price) * Number(item.Quantity),
          0
        )
      : 0,
  },
  user: { userregester: userinformation },
};
const store = createStore(
  reducers,
  intialstate,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
