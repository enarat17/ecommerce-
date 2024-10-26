import Regestercomponent from "./components/Regestercomponent";
import axios from "axios";
import { getuserin } from "../redux/action/useractions";
import { useDispatch } from "react-redux";

const regesternewone = async (
  name,
  lastname,
  email,
  pass,
  phone,
  address,
  isadmin
) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/users/register",
    {
      name,
      lastname,
      email,
      pass,
      phone,
      address,
      isadmin,
    },
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};
function RegesterPage() {
  const dispatch = useDispatch();
  return (
    <Regestercomponent
      regesternewone={regesternewone}
      dispatch={dispatch}
      getuserin={getuserin}
    />
  );
}

export default RegesterPage;
