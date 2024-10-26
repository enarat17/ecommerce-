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

function Usercartorderdetails({
  userregester,
  getuser,
  cartinfo,
  delete_item,
  changecount_func,
  makeorder,
  loadScript,
  load_paypall_scrept,
  paymenthandler,
  paymentmethod,
}) {
  const [userinfo, setuserinfo] = useState(null);

  const [button_disable, setbutton_disable] = useState(false);
  const [isPaid, setisPaid] = useState(false);
  const [order_button_message, setorder_button_message] =
    useState("Pay for the order");
  console.log(userinfo);
  console.log(cartinfo);
  useEffect(() => {
    getuser(userregester._id).then((res) => setuserinfo(res));
  }, [getuser, userregester._id]);

  const createorder = async () => {
    setbutton_disable(true);

    const orderdata = {
      orderTotal: {
        cartSubtotal: cartinfo.cartsubtotal,
        itemsCount: cartinfo.itemscounts,
      },
      cartItems: cartinfo.cartitems.map((item, i) => {
        return {
          name: item.name,
          price: item.price,
          image: { path: item.image?.path ? item.image.path : null },
          quantity: item.Quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentmethod,
    };
    console.log(orderdata);
    if (paymentmethod === "pp") {
      setorder_button_message("click on any button below ?");
      if (!isPaid) {
        try {
          load_paypall_scrept(
            orderdata.cartItems,
            orderdata.orderTotal.cartSubtotal
          );
        } catch (err) {
          console.log(err);
          setorder_button_message("Error with paypal");
        }
      }
    } else {
      setorder_button_message("your order successfully created ✔");
      makeorder(orderdata).then((data) => {
        if (data) {
          console.log(data);
        }
      });
    }
  };

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
              Name: <b>{userinfo?.name}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              Address : <b>{userinfo?.address ? userinfo.address : ""}</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Phone : <b>{userinfo?.phone}</b>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h3> Payment method</h3>
          <Form.Select
            aria-label="Default select example"
            onChange={paymenthandler}
          >
            <option value="cod">cash on Delivery </option>
            <option value="pp">paybal method </option>
            <option value="vs">visa card</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <ListGroup as="ol">
            <ListGroup.Item>
              <b>Order summary</b>
            </ListGroup.Item>
            <ListGroup.Item>
              Item price: <b>{cartinfo.cartsubtotal}</b> SAR
            </ListGroup.Item>
            <ListGroup.Item>
              Tax : <b>includeds</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Total Price :{" "}
              <b style={{ color: "red" }}>{cartinfo.cartsubtotal}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="danger"
                onClick={createorder}
                disabled={button_disable}
              >
                {order_button_message}
              </Button>
              <div id="paypall_container" className="paypall"></div>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Row>
          <Col md={4}>
            <Alert variant="danger" className="mt-1">
              {userinfo?.address
                ? "Not Deliverd "
                : "Not Deliverd and you should update you address "}
            </Alert>
          </Col>
          <Col md={4}>
            <Alert variant="info"> Not Deliverd</Alert>
          </Col>
        </Row>
      </Row>
      {/* ////////////////////////////////////////////////////////////////////////////// */}
      {cartinfo.cartitems.map((item, index) => (
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
            <Form.Select
              size="sm"
              value={item.Quantity}
              onChange={(e) => changecount_func(item.productid, e.target.value)}
            >
              {[...Array(item.count).keys()].map((x) => (
                <option key={x} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={1}>
            {" "}
            <Button
              type="button"
              onClick={() =>
                delete_item(item.productid, item.Quantity, item.price)
              }
            >
              <i className="bi bi-trash3-fill"></i>
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Usercartorderdetails;
