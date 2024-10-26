import axios from "axios";
import { login_user, logout_user } from "../consts/userconsts";

export const getuserin = (userinformation) => (dispatch) => {
  dispatch({
    type: login_user,
    payload: userinformation,
  });
};

export const logout = () => (dispatch) => {
  document.location.href = "/loginPage";
  axios.get("http://localhost:5000/api/v1/clear_token");
  localStorage.removeItem("userinfo");
  localStorage.removeItem("cart");
  sessionStorage.removeItem("userinfo");
  dispatch({
    type: logout_user,
  });
};
