import Orderspage from "./components/Orderspage";
import axios from "axios";

const getorders = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/v1/orders/admin_orders",
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );

  return data;
};

function UserOrdersPage() {
  return <Orderspage getorders={getorders} />;
}

export default UserOrdersPage;
