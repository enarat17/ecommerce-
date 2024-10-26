import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function CatogeryCard({ item, index }) {
  const categoryphotos = [
    "/images/cam.jpg",
    "/images/phone.jpg",
    "/images/t shirt.jpg",
    "/images/monitors-category.png",
    "/images/wirte.jpg",
  ];
  return (
    <Card>
      <Card.Img
        style={{ width: "auto", height: "400px" }}
        variant="top"
        src={categoryphotos[index]}
      />
      <Card.Body>
        <Card.Title>{item}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to="/ProductList">
          <Button variant="primary">Go somewhere</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CatogeryCard;
