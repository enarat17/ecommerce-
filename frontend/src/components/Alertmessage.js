//import { useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
//import Button from "react-bootstrap/Button";
function Alertmessage({ setshowmessage, showmessage }) {
  const navigate = useNavigate();

  const goback = () => {
    navigate(-1);
  };

  return (
    <Alert
      variant="success"
      onClose={() => setshowmessage(false)}
      dismissible
      show={showmessage}
    >
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>The product was added in your cart 👍</p>
      <Button variant="success" onClick={() => goback()}>
        Go back
      </Button>
      {"  "}
      <Link to="/CartPage">
        <Button variant="danger">To cart </Button>
      </Link>
    </Alert>
  );
}

//<Button onClick={() => setShow(true)}>Show Alert</Button>;

export default Alertmessage;
