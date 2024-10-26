import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel-1.png"
          style={{ height: "300px", objectFit: "cover" }}
          alt="img_ssname"
        />

        <Carousel.Caption>
          <LinkContainer to="/ProductDetails" style={{ cursor: "pointer" }}>
            <h3>First slide label</h3>
          </LinkContainer>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel-2.png"
          alt="hj"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <LinkContainer to="/ProductDetails" style={{ cursor: "pointer" }}>
            <h3>Second slide label</h3>
          </LinkContainer>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel-3.png"
          alt="hj"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <LinkContainer to="/ProductDetails" style={{ cursor: "pointer" }}>
            <h3>Third slide label</h3>
          </LinkContainer>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
