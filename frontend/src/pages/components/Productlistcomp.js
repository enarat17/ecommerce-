import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SortOptions from "../../components/SortOptions";
import StarRatings from "../../components/StarRatings";
import SortingAtributes from "../../components/SortingAtributes";
import CategoryCardComp from "../../components/CategoryCardComp";
import PagnationComp from "../../components/PagnationComp";
import AddtionAtribute from "../../components/AddtionAtribute";
import { useEffect, useState } from "react";

// import axios from "axios";
// const getpro = async () => {
//   const response = await axios.get("http://localhost:5000/api/v1/products");
//   console.log(response.data);
// };
function Productlistcomp({ getpro }) {
  const [products, setproducts] = useState([]);
  //getpro();

  useEffect(() => {
    getpro().then((res) => setproducts(res.all_prosuct));
  }, [getpro]);
  // const categorycarditems = [
  //   "phone",
  //   "books",
  //   "phone",
  //   "books",
  //   "phone",
  //   "books",
  //   "phone",
  //   "books",
  // ];
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <SortOptions />
            </ListGroup.Item>
            <ListGroup.Item>
              <StarRatings />
            </ListGroup.Item>
            <ListGroup.Item>
              <SortingAtributes />
            </ListGroup.Item>
            <ListGroup.Item>
              <AddtionAtribute />
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary" className="mt-3">
            submit
          </Button>{" "}
          <Button variant="danger" className="mt-3">
            remove
          </Button>{" "}
        </Col>

        <Col md={9}>
          <Container style={{ width: "90%" }}>
            <Row xs={1} md={3} className="g-4 mt-3 mL-2">
              {products.map((item, index) => (
                <CategoryCardComp key={index} item={item} index={index} />
              ))}
            </Row>
          </Container>

          <PagnationComp />
        </Col>
      </Row>
    </Container>
  );
}

export default Productlistcomp;
