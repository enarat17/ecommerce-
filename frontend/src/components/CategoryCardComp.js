import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReactStars from "react-stars";
function CategoryCardComp({ index, item }) {
  // const images = [
  //   "/images/cam.jpg",
  //   "/images/phone.jpg",
  //   "/images/t shirt.jpg",
  //   "/images/monitors-category.png",
  //   "/images/wirte.jpg",
  //   "/images/cam.jpg",
  //   "/images/phone.jpg",
  //   "/images/t shirt.jpg",
  //   "/images/monitors-category.png",
  //   "/images/wirte.jpg",
  // ];
  return (
    // style={{ width: "18rem" }}
    <>
      <Card className="ms-.2">
        <Card.Img
          className="p-1"
          variant="top"
          src={item.images[0] ? item.images[0].path : ""}
          style={{ width: "100%", height: 350 }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <ReactStars
            count={item.rating}
            color1="#ffd700"
            size={15}
            className="startincard"
          />
          <p>
            price <b>{item.price}</b> SAR / one
          </p>

          <LinkContainer to={`/ProductDetails/${item._id}`}>
            <Button variant="danger">More details</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </>
  );
}

export default CategoryCardComp;
