import { Button, Col, Container, Row } from "react-bootstrap";
import ReactStars from "react-stars";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Alertmessage from "../../components/Alertmessage";
import Alert from "react-bootstrap/Alert";
import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addtocart } from "../../redux/action/cartactions";
import { useParams } from "react-router-dom";

function Productdetailscomp({ getproductdetails }) {
  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [Quantity, setQuantity] = useState(1);
  const [showmessage, setshowmessage] = useState(false);
  console.log(product);

  const dispatch = useDispatch();
  //const productnum = useSelector((state) => state.cart.count);
  //   const imageforproduct = [
  //     "/images/cam.jpg",
  //     "/images/phone.jpg",
  //     "/images/monitors-category.png",
  //     "/images/wirte.jpg",
  //   ];
  var options = {
    width: 400,
    zoomWidth: 500,
    scale: 2,
    offset: { vertical: 0, horizontal: 10 },
  };

  const add = () => {
    dispatch(addtocart(id, Quantity));
    setshowmessage(true);
  };
  useEffect(() => {
    getproductdetails(id).then((item) => setproduct(item));
  }, [id, getproductdetails]);
  useEffect(() => {
    new ImageZoom(document.getElementById("image1"), options);
    new ImageZoom(document.getElementById("image2"), options);
    new ImageZoom(document.getElementById("image3"), options);
    new ImageZoom(document.getElementById("image4"), options);
  });

  return (
    <Container>
      {showmessage ? (
        <Alertmessage
          setshowmessage={setshowmessage}
          showmessage={showmessage}
        />
      ) : (
        ""
      )}

      <Row className="mt-5">
        <Col md={4} style={{ zIndex: 1 }}>
          {product?.data?.images.length > 0
            ? product.data.images.map((image, index) => (
                <div
                  key={index}
                  style={{ display: "flex", marginBottom: 2 }}
                  id={`image${index + 1}`}
                >
                  <img
                    src={image.path}
                    alt={index + 1}
                    className="imageproduct"
                  />
                </div>
              ))
            : ""}
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <h1> CANON Camera </h1>
              <hr />
              <div style={{ display: "flex" }}>
                <ReactStars count={5} color1="#ffd700" size={20} />
                (5)
              </div>
              <hr />
              <p>
                Price <b> 500 / one </b>
              </p>
              <hr />
              In this example, I've used the alt text "Lamp" followed by the
              index of the image to provide a clear and descriptive description
              for each lamp image. This helps users who rely on screen readers
              to understand the content of the images more effectively. Adjust
              the
              <hr />
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>status in stock</ListGroup.Item>
                <ListGroup.Item>
                  price <b>500</b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity
                  <Form.Select
                    size="sm"
                    value={Quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    variant="danger"
                    style={{ width: "100%" }}
                    onClick={() => add()}
                  >
                    ADD
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <h6> REVIEWS </h6>
          <ListGroup variant="flush">
            {Array.from({ length: 6 }).map((_, index) => (
              <ListGroup.Item key={index}>
                Cras justo odio
                <ReactStars count={5} color1="#ffd700" size={15} />
                2024-5-3
                <p>
                  this is very good for our life bla bla bla .to provide a clear
                  and descriptive description for each lamp image. This helps
                  users who rely on screen readers to understand the content of
                  the images more.
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />
          <Alert variant="danger">log in to write make comment</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>write any thing about our product</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <Form.Select aria-label="Default select example">
            <option>your rating</option>
            <option value="1">good</option>
            <option value="2">very good </option>
            <option value="3">not good</option>
          </Form.Select>
          <Button variant="primary">Select</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Productdetailscomp;
