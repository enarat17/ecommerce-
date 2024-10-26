import Userorderpagecomp from "../components/Userorderpagecomp";

import axios from "axios";

const get_orders = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/orders", {
    withCredentials: true, // This line ensures cookies are sent with the request
  });
  return data;
};

function UserOrdersPage() {
  return (
    <Userorderpagecomp get_orders={get_orders}/>
  );
}

export default UserOrdersPage;
