import { Button, Col, Image, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
function CartItems({
  items,
  index,
  ordercreated = false,
  changecount = true,
  changecount_func,
  delete_item,
}) {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src="/images/cam.jpg" alt="image-for0item" fluid />
        </Col>
        <Col md={2}>
          <h6>{items.name}</h6>
        </Col>
        <Col md={2}>
          {" "}
          price <b>{items.price}</b>
        </Col>
        <Col md={2}>
          {" "}
          <Form.Select
            size="sm"
            disabled={ordercreated}
            value={items.Quantity}
            onChange={(e) => changecount_func(items.productid, e.target.value)}
          >
            {[...Array(items.count).keys()].map((x) => (
              <option key={x} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          {" "}
          <Button
            type="button"
            onClick={() =>
              delete_item(items.productid, items.Quantity, items.price)
            }
          >
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </Col>
      </Row>
      <hr />
    </ListGroup.Item>
  );
}

export default CartItems;
