import Userpage from "./components/Userpage";

import axios from "axios";

const getuser = async (abctrl) => {
  const { data } = await axios.get("http://localhost:5000/api/v1/users", {
    signal: abctrl.signal,
  });

  return data;
};
const deleteuser = async (userid) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/v1/users/${userid}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );

  return data;
};
function AdminUsersPage() {
  return <Userpage getuser={getuser} deleteuser={deleteuser} />;
}

export default AdminUsersPage;
