import Logincomponents from "./components/Logincomponents";
import axios from "axios";
import { getuserin } from "../redux/action/useractions";
import { useDispatch } from "react-redux";

const userlogin = async (email, password, doNotLogout) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/users/login",
    {
      email,
      password,
      doNotLogout,
    },
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  if (data.user.doNotLogout) {
    localStorage.setItem("userinfo", JSON.stringify(data));
  } else {
    sessionStorage.setItem("userinfo", JSON.stringify(data));
  }

  return data;
};

function LoginPage() {
  const dispatchuser = useDispatch();
  return (
    <Logincomponents
      userlogin={userlogin}
      dispatchuser={dispatchuser}
      getuserin={getuserin}
    />
  );
}

export default LoginPage;
