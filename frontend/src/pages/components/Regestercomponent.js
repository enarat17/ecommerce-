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
function Regestercomponent({ regesternewone, dispatch, getuserin }) {
  const [validated, setValidated] = useState(false);
  const [passwordcheck, setpasswordcheck] = useState(true);
  const [showPassword, setshowpassword] = useState(false);
  const [registerstate, setregestersate] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const togglePasswordVisibility = () => {
    setshowpassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const pass = form.input_password.value;
    const confirm = form.input_repeatpassword.value;
    const phone = form.phone.value;
    const address = form.address.value;

    if (
      event.currentTarget.checkValidity() === true &&
      name &&
      lastname &&
      email &&
      pass &&
      phone &&
      address &&
      confirm === pass
    ) {
      setregestersate({ loading: true });
      regesternewone(name, lastname, email, pass, phone, address)
        .then((res) => {
          console.log(res.user);
          setregestersate({
            loading: false,
            success: "success",
          });
          dispatch(getuserin(res.user));
          if (res.user) {
            sessionStorage.setItem("userinfo", JSON.stringify(res.user));
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          setregestersate({
            loading: false,
            error: err.response.data.message,
          });
        });
    } else {
    }

    setValidated(true);
  };

  const Checkpassword = () => {
    const password = document.querySelector("input[name=input_password]");
    const confirm = document.querySelector("input[name=input_repeatpassword]");

    if (password.value === confirm.value) {
      setpasswordcheck(true);
    } else {
      setpasswordcheck(false);
    }
  };
  return (
    <Container className="registerpage">
      <Row md={8}>
        <Row className="mb-3">
          <h1>
            {" "}
            <b>Rgister page</b>{" "}
          </h1>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group
                as={Col}
                controlId="validationname"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* /////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="update_name"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=" enter your Last name"
                  name="lastname"
                />
                <Form.Control.Feedback type="invalid">
                  Enter your last name ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* /////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="update_email"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Email adrees</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="enter your email"
                  name="email"
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
                  name="input_password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  minLength={6}
                  onChange={Checkpassword}
                  //isInvalid={!passwordcheck}
                />
                <Form.Text>
                  <Form.Text>
                    <small
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {showPassword ? "Hide password" : "Show password"}
                    </small>
                    <br />
                    your password should be more that 6 digits
                  </Form.Text>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter your password ?
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="update_repetpassword"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  name="input_repeatpassword"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  minLength={6}
                  onChange={Checkpassword}
                  isInvalid={!passwordcheck}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginBottom: 15 }}
                >
                  Please enter your password ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* ///////////////////////////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="phone"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="enter your phone"
                  name="phone"
                />
                <Form.Control.Feedback type="invalid">
                  your phone please ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* ///////////////////////////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="address"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="enter your address"
                  name="address"
                />
                <Form.Control.Feedback type="invalid">
                  your address please ?
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Text>
                {" "}
                <b> Do you have account already ?</b>
                <Link to="/LoginPage">login</Link>{" "}
              </Form.Text>
            </Col>
          </Row>

          {/* <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group> */}
          <Button type="submit">
            {registerstate.loading ? (
              <Spinner animation="border" size="sm" />
            ) : null}
            Submit form
          </Button>
          <Alert
            variant={registerstate.error ? "danger" : null}
            className="mt-3"
          >
            {registerstate.error
              ? "user with that email already exists!"
              : null}
          </Alert>
          <Alert
            variant={registerstate.success ? "info" : null}
            className="mt-3"
          >
            {registerstate.success === "success"
              ? "your account is created done 👍"
              : null}
          </Alert>
        </Form>
      </Row>
    </Container>
  );
}

export default Regestercomponent;
