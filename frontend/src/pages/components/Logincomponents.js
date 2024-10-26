import {
  Container,
  Row,
  Form,
  Button,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Logincomponents({ userlogin, dispatchuser, getuserin }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loginstate, setloginstate] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;
    if (event.currentTarget.checkValidity() === true && email && password) {
      setloginstate({ loading: true });
      userlogin(email, password, doNotLogout)
        .then((res) => {
          console.log(res);

          setloginstate({ loading: false });
          if (res.user) {
            dispatchuser(getuserin(res.user));
          }

          if (!res.user.isadmin) {
            navigate("/", { replace: true });
            // Window.location.href = "/";
          } else {
            navigate("/AdminOrderPage", { replace: true });
            // Window.location.href = "/AdminOrderPage";
          }
        })
        .catch((err) =>
          setloginstate({
            error: err ? err.response : err.response,
          })
        );
    }

    setValidated(true);
  };

  return (
    <Container className="registerpage">
      <Row md={8}>
        <Row className="mb-3">
          <h1>
            {" "}
            <b>Login page</b>{" "}
          </h1>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group
                as={Col}
                controlId="update_adress"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Email adrees</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="update_password"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Password </Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  minLength={6}
                />
                <Form.Text>enter your password with contain 6 digits</Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter your password ?
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Text>
                {" "}
                <b> Do you have account already ?</b>
                <Link to="/RegesterPage">Regester</Link>{" "}
              </Form.Text>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              name="doNotLogout"
              type="checkbox"
              label="Do not logout"
            />
          </Form.Group>
          <Button type="submit">
            {loginstate && loginstate.loading === true ? (
              <Spinner animation="border" size="sm" />
            ) : (
              ""
            )}
            Login...
          </Button>
          <Alert
            show={
              loginstate && loginstate.error === "email or password is wrong"
                ? true
                : false
            }
            variant="danger"
            className="mt-3"
          >
            Wrong information
          </Alert>
          <Alert show={false} variant="info" className="mt-3">
            Login is done 🏃‍♀️
          </Alert>
        </Form>
      </Row>
    </Container>
  );
}

export default Logincomponents;
