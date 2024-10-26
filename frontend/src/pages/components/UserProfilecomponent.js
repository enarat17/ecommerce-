import {
  Container,
  Row,
  Form,
  Button,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserProfilecomponent({
  update_user,
  logout,
  dispatch,
  fetch_user,
  getuserin,
  localstorage,
  sessionstorage,
}) {
  const [validated, setValidated] = useState(false);
  const [passwordcheck, setpasswordcheck] = useState(true);
  const [showpasswd, setshowpasswd] = useState(true);
  const [loading, setloading] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const { userregester } = useSelector((state) => state.user);
  //console.log(userregester._id);
  const [user, setuser] = useState({});

  useEffect(() => {
    fetch_user(userregester._id)
      .then((res) => {
        setuser(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [fetch_user, userregester._id]);

  const showpass = () => {
    setshowpasswd(!showpasswd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    //const email = form.email.value;
    const phone = form.phone.value;
    const country = form.country.value;
    const address = form.address.value;
    const zipcode = form.zipcode.value;
    const city = form.city.value;
    const pass = form.password.value;
    const repeatpassword = form.repeatpassword.value;

    if (
      event.currentTarget.checkValidity() === true &&
      pass === repeatpassword
    ) {
      setloading({ loading: true });
      update_user({
        name,
        // email,
        phone,
        country,
        address,
        zipcode,
        city,
        pass,
      })
        .then((res) => {
          setloading({ loading: false, success: true });
          dispatch(
            getuserin({ doNotLogout: userregester.doNotLogout, ...res.user })
          );
          //document.location.href = "/";
          if (userregester.doNotLogout) {
            localstorage.setItem("userinfo", JSON.stringify(res.user));
          } else {
            sessionstorage.setItem("userinfo", JSON.stringify(res.user));
          }
          //dispatch(logout());
          //console.log(res);
        })
        .catch((err) => {
          setloading({ loading: false, success: false });
          console.log(err);
        });
    }

    setValidated(true);
  };

  const Checkpassword = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=repeatpassword]");

    if (password.value === confirm.value) {
      // confirm.setCustomValidity("");
      setpasswordcheck(true);
    } else {
      //confirm.setCustomValidity("no match");
      setpasswordcheck(false);
    }
  };
  return (
    <Container className="registerpage">
      <Row md={8}>
        <Row className="mb-3">
          <h1>
            {" "}
            <b>profile page</b>{" "}
          </h1>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group
                as={Col}
                controlId="profile_name"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>your name </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={userregester.name}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* /////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="profile_number"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Phone number </Form.Label>
                <Form.Control
                  type="number"
                  placeholder={user.phone}
                  name="phone"
                />
                <Form.Control.Feedback type="invalid">
                  Enter your number ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* /////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="profile_emailadress"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Email adrees</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userregester.email}
                  name="email"
                  disabled={true}
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* //////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="profile_country"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter your country name "
                  name="country"
                  defaultValue={user.country}
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* //////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="prifile_adress"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Adress </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter your street and home number "
                  name="address"
                  defaultValue={user.address}
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* //////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="profile_zipcode"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Zip Code </Form.Label>
                <Form.Control
                  type="text"
                  //splaceholder="enter your Zip city code "
                  name="zipcode"
                  defaultValue={user.zipcode}
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>
              {/* //////////////////////////////////////////////////////////// */}
              <Form.Group
                as={Col}
                controlId="profle_city"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>city</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter your city"
                  name="city"
                  defaultValue={user.city}
                />
                <Form.Control.Feedback type="invalid">
                  your email please ?
                </Form.Control.Feedback>
              </Form.Group>{" "}
              <Form.Group
                as={Col}
                controlId="profule_pass"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Password </Form.Label>
                <Form.Control
                  name="password"
                  type={showpasswd ? "password" : "text"}
                  placeholder="Password"
                  minLength={6}
                  onChange={Checkpassword}
                  isInvalid={!passwordcheck}
                  required
                />
                <Form.Text>enter your password with contain 6 digits</Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter your password ?
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="profile_repetpass"
                style={{ marginBottom: 15 }}
              >
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  name="repeatpassword"
                  type={showpasswd ? "password" : "text"}
                  placeholder="Repeat password"
                  minLength={6}
                  onChange={Checkpassword}
                  isInvalid={!passwordcheck}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginBottom: 15 }}
                >
                  Please enter your password ?
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Text>
                <small
                  onClick={showpass}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {showpasswd ? "showpass👀" : "hidepass"}
                </small>
                <br />
                your password should be more that 6 digits
              </Form.Text>
            </Col>
          </Row>

          <Button type="submit">
            {loading && loading.loading ? (
              <Spinner animation="grow" size="sm" />
            ) : (
              ""
            )}
            Update
          </Button>
          {loading.success === false ? (
            <Alert variant="danger" className="mt-3">
              user with that email already exists!
            </Alert>
          ) : (
            ""
          )}
          {loading && loading.success === true ? (
            <Alert variant="info" className="mt-3">
              your Updated 👍
            </Alert>
          ) : (
            ""
          )}
        </Form>
      </Row>
    </Container>
  );
}

export default UserProfilecomponent;
