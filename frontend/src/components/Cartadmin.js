import { Button, Col, Image, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
function Cartadmin({ item }) {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={item.image.path} alt="image-for0item" fluid />
        </Col>
        <Col md={2}>
          <h6> {item.name}</h6>
        </Col>
        <Col md={2}>
          {" "}
          price <b>{item.price}</b>
        </Col>
        <Col md={2}>
          {" "}
          <Form.Select size="sm" disabled value={item.quantity}>
            {[...Array(item.count).keys()].map((x) => (
              <option key={x} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          {" "}
          <Button type="button" disabled>
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Cartadmin;
