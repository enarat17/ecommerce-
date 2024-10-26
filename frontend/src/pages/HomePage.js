import CatogeryCard from "../components/CatogeryCard";
import Slider from "../components/Slider";

import { Row, Container } from "react-bootstrap";

function HomePage() {
  const CatogoryofProduct = ["Cam", "phones ", "shirts", "monitors", "wires"];
  return (
    <>
      <Slider />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-3">
          {CatogoryofProduct.map((item, index) => (
            <CatogeryCard key={index} item={item} index={index} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
