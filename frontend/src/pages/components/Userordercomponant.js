import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  ListGroup,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function Userordercomponant({
  get_orders,
  getorder,
  get_user_infromation,
  userregester,
}) {
  const orderid = useParams();
  const [orders, setorders] = useState([]);
  const [userinfo, setuserinfo] = useState({});
  console.log(orderid);
  useEffect(() => {
    getorder(orderid.id)
      .then((res) => setorders(res.order_details))
      .catch((err) => console.log("no order for this user"));
  }, [getorder, orderid]);
  useEffect(() => {
    get_user_infromation(userregester._id)
      .then((res) => setuserinfo(res))
      .catch((err) => console.log("user not found"));
  }, [get_user_infromation, userregester._id]);

  return (
    <Container fluid key={orders._id}>
      <Row className="mt-3">
        <h1>Order details</h1>
      </Row>
      <Row className="mt-3">
        <Col md={4}>
          <ListGroup as="ol">
            <ListGroup.Item>
              <b>Shipping</b>
            </ListGroup.Item>
            <ListGroup.Item>
              Name: <b>{userinfo.name}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              Address : <b>{userinfo.address}</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Phone : <b>{userinfo.phone}</b>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h3> Payment method</h3>
          <Form.Select aria-label="Default select example" disabled>
            <option value="1">{orders.paymentMethod} </option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <ListGroup as="ol">
            <ListGroup.Item>
              <b>Order summary</b>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price: <b></b> SAR
            </ListGroup.Item>
            <ListGroup.Item>
              Tax : <b>includeds</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Total Price :{" "}
              <b style={{ color: "red" }}>{orders?.orderTotal?.cartSubtotal}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                disabled
                variant={
                  orders.isDelivered && orders.ispaid ? "info" : "danger"
                }
              >
                {orders.isDelivered && orders.ispaid
                  ? "Done deliverd ✔"
                  : "  wait for your order you can pay on Delivery"}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Row>
          <Col md={4}>
            <Alert
              variant={orders.isDelivered ? "info" : "danger"}
              className="mt-1"
            >
              {orders.isDelivered ? "Done deliverd ✔" : " Not deliver"}
            </Alert>
          </Col>
          <Col md={4}>
            <Alert variant={orders.isPaid ? "info" : "danger"}>
              {" "}
              {orders.isPaid ? "Done paid 💰" : "Not paid yet 🙄"}
            </Alert>
          </Col>
        </Row>
      </Row>
      {/* ////////////////////////////////////////////////////////////////////////////// */}
      {orders?.cartItems?.map((item, index) => (
        <>
          <Row md={8} key={index}>
            <Col md={1}>
              <Image
                src={item.image.path}
                alt="image-for0item"
                fluid
                className="image_caryt_details"
              />
            </Col>
            <Col md={1}>
              <h6> {item.name}</h6>
            </Col>
            <Col md={1}>
              {" "}
              price <b>{item.price}</b>
            </Col>
            <Col md={2}>
              {" "}
              <Form.Select size="sm" disabled>
                {Array.from({ length: 20 }).map((_, i) => (
                  <option key={i}>{item.quantity}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={1}>
              {" "}
              <Button
                type="button"
                onClick={() => window.confirm(" Are you sure to remove this ?")}
                disabled
              >
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </Col>
          </Row>
        </>
      ))}
    </Container>
  );
}

export default Userordercomponant;
