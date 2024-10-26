import Orderdetails from "./components/Orderdetails";
import axios from "axios";

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

const makedelevierd = async (orderid) => {
  const { data } = await axios.put(
    `http://localhost:5000/api/v1/orders/delevierd/${orderid}`,
    {},
    {
      withCredentials: true, // to send cookies to the server (for authentication)
    }
  );

  return data;
};
function AdminOrderDetails() {
  return <Orderdetails getorder={getorder} makedelevierd={makedelevierd} />;
}

export default AdminOrderDetails;
