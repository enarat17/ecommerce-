import axios from "axios";
import Userordercomponant from "../components/Userordercomponant";
import { useSelector } from "react-redux";

const get_orders = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/orders", {
    withCredentials: true, // This line ensures cookies are sent with the request
  });
  return data;
};
const getorder = async (orderid) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/orders/user/${orderid}`,
    {
      withCredentials: true, // to send cookies to the server (for authentication)
    }
  );
  console.log(data);
  return data;
};

const get_user_infromation = async (usrerid) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/users/${usrerid}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

function UserOrderDetails() {
  const { userregester } = useSelector((state) => state.user);
  return (
    <Userordercomponant
      get_orders={get_orders}
      getorder={getorder}
      get_user_infromation={get_user_infromation}
      userregester={userregester}
    />
  );
}

export default UserOrderDetails;
