import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import Cartadmin from "../../components/Cartadmin";
function Orderdetails({ getorder, makedelevierd }) {
  const [orderdetails, setOrder] = useState([]);
  const [userinfo, setUser] = useState({});
  const [cartinfo, setCart] = useState([]);
  const [itemsinfo, setIteminfo] = useState([]);
  const [delevired, setDelevired] = useState(false);

  const { id } = useParams();

  const updatedelevrd = (id) => {
    console.log(id);
    makedelevierd(id)
      .then((res) => {
        if (res) {
          setDelevired(true);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getorder(id).then((res) => {
      setOrder(res.order_details);
      setUser(res.order_details.user);
      setCart(res.order_details.orderTotal);
      setIteminfo(res.order_details.cartItems);
    });
  }, [getorder, id, delevired]);
  return (
    <Container fluid>
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
              Name:{" "}
              <b>
                {userinfo.name !== null
                  ? userinfo.name + " " + userinfo.lastname
                  : ""}
              </b>
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
          <Form.Select
            aria-label="Default select example"
            value={orderdetails.paymentMethod}
            disabled
          >
            <option value="1">{orderdetails.paymentMethod}</option>
            <option value="2">paybal method </option>
            <option value="3">visa card</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <ListGroup as="ol">
            <ListGroup.Item>
              <b>Order summary</b>
            </ListGroup.Item>
            <ListGroup.Item>Items price SAR</ListGroup.Item>
            <ListGroup.Item>
              Tax : <b>includeds</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Total Price :{" "}
              <b style={{ color: "red" }}>{cartinfo.cartSubtotal}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="primary"
                disabled={orderdetails.isDelivered}
                onClick={() => updatedelevrd(orderdetails._id)}
              >
                {orderdetails.isPaid
                  ? "Done deliverd & paid"
                  : "Mark as Deliverd"}{" "}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Row>
          <Col md={4}>
            <Alert
              variant={orderdetails.isDelivered ? "success" : "danger"}
              className="mt-1"
            >
              {" "}
              {orderdetails.isDelivered
                ? `Delivered ✔ at ${orderdetails.deliveredAt}`
                : "Not delivered"}
            </Alert>
          </Col>
          <Col md={4}>
            <Alert variant={orderdetails.isPaid ? "info" : "danger"}>
              {" "}
              {orderdetails.isPaid ? "Done Paid ✔" : "Not paid"}
            </Alert>
          </Col>
        </Row>
      </Row>
      {/* ////////////////////////////////////////////////////////////////////////////// */}
      <Row md={8}>
        <ListGroup>
          {itemsinfo.map((item, index) => (
            <Cartadmin key={index} item={item} />
          ))}
        </ListGroup>
        {/* <Col md={1}>
          <Image src="/images/cam.jpg" alt="image-for0item" fluid />
        </Col>
        <Col md={1}>
          <h6> Camera canon</h6>
        </Col>
        <Col md={1}>
          {" "}
          price <b>250</b>
        </Col>
        <Col md={2}>
          {" "}
          <Form.Select size="sm" disabled>
            {Array.from({ length: 20 }).map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={1}>
          {" "}
          <Button type="button" disabled>
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </Col> */}
      </Row>
    </Container>
  );
}

export default Orderdetails;
