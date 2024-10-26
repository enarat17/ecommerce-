import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";
import axios from "axios";
import { useEffect, useState } from "react";

// function ProtectiveComPonent({ admin }) {
//   const [isauth, setauth] = useState();

//   useEffect(() => {
//     let mounted = true; // Flag to track if the component is mounted

//     axios
//       .get("http://localhost:5000/api/v1/get_token", {
//         withCredentials: true, // Ensure cookies are sent with the request
//       })
//       .then(function (response) {
//         if (mounted) {
//           // Check if the component is still mounted before updating state
//           setauth(response.data.isadmin);
//           console.log(response.data.isadmin);
//         }
//         return isauth;
//       })
//       .catch(function (error) {
//         console.log(error); // Handle errors if any
//       });

//     return () => {
//       mounted = false; // When the component unmounts, update the mounted flag
//     };
//   }, [isauth]);

//   if (isauth === undefined) {
//     return <Navigate to="/LoginPage" />;
//   }

//   return isauth && admin && isauth !== true ? (
//     <Navigate to="/LoginPage" />
//   ) : isauth && admin === "true" ? (
//     <Outlet />
//   ) : isauth && admin !== "true" ? (
//     <>
//       <UserChatComponent />
//       <Outlet />
//     </>
//   ) : (
//     <Navigate to="/loginPage" />
//   );
// }

// export default ProtectiveComPonent;
function ProtectiveComponent({ admin }) {
  const [isauth, setAuth] = useState(null); // Initialize with null

  useEffect(() => {
    let mounted = true;

    axios
      .get("http://localhost:5000/api/v1/get_token", {
        withCredentials: true,
      })
      .then(function (response) {
        if (mounted) {
          setAuth(response.data.isadmin); // Update state only if mounted
          console.log(response.data.isadmin);
        }
      })
      .catch(function (error) {
        console.log(error); // Handle errors if any
      });

    return () => {
      mounted = false; // Cleanup function
    };
  }, [isauth]); // Empty dependency array for initial mount only

  if (isauth === null) {
    return null; // or loading indicator if desired
  }

  if (admin === "false" && isauth === false) {
    return (
      <>
        <Outlet />
        <UserChatComponent />
      </>
    );
  }

  if (admin && isauth) {
    return <Outlet />;
  }

  return <Navigate to="/LoginPage" />;
}

export default ProtectiveComponent;
