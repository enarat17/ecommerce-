import { Button, Col, Container, Row } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import CartItems from "../../components/CartItems";
import { Link } from "react-router-dom";

function Cartpagecomponant({ cart_info, dispatch, addtocart, delete_item }) {
  console.log(cart_info.cartitems);

  const changecount_func = (productid, count) => {
    dispatch(addtocart(productid, count));
  };
  const cartarray = cart_info.cartitems;
  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shoping Cart</h1>
          <Row>
            {cartarray.map((items, index) => (
              <ListGroup variant="flush" key={index}>
                <CartItems
                  items={items}
                  index={index}
                  changecount_func={changecount_func}
                  delete_item={delete_item}
                />
              </ListGroup>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3> subtotal items</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              Price <b style={{ color: "red" }}>{cart_info.cartsubtotal} SAR</b>
            </ListGroup.Item>
            <ListGroup.Item>
              {cart_info.itemscounts > 0 ? (
                <Link to="/UserCart">
                  <Button variant="primary"> check out </Button>
                </Link>
              ) : (
                "please fill your cart 🤏"
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Cartpagecomponant;
