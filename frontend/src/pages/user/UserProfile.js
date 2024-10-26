import UserProfilecomponent from "../components/UserProfilecomponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/useractions";
import { getuserin } from "../../redux/action/useractions";

const update_user = async ({
  name,
  email,
  phone,
  country,
  address,
  zipcode,
  city,
  pass,
}) => {
  const { data } = await axios.put(
    "http://localhost:5000/api/v1/users/profile",
    {
      name: String(name),
      //email: String(email),
      phone: String(phone),
      country: String(country),
      address: String(address),
      zipcode: Number(zipcode),
      city: String(city),
      pass: pass,
    },
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

const fetch_user = async (user_id) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/users/${user_id}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

function UserProfile() {
  const dispatch = useDispatch();
  return (
    <UserProfilecomponent
      update_user={update_user}
      dispatch={dispatch}
      logout={logout}
      fetch_user={fetch_user}
      getuserin={getuserin}
      localstorage={window.localStorage}
      sessionstorage={window.sessionStorage}
    />
  );
}

export default UserProfile;
