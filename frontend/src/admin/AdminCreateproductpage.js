import {
  Button,
  Col,
  Container,
  Row,
  Table,
  CloseButton,
} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

function AdminCreateproductpage({ createProduct, uploadimag }) {
  const [validated, setValidated] = useState(false);
  const [attrtable, setatrrtable] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
      count: form.count.value,
      category: form.category.value,
      attribute: attrtable,
    };
    if (event.currentTarget.checkValidity() === true) {
      createProduct(formInputs)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="create-prduct-form" md={6}>
        <Col md={6}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LinkContainer to="/AdminProductPage">
              <Button variant="primary"> go back </Button>
            </LinkContainer>
            <h3> Create New Product</h3>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              controlId="new-item"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>new product</Form.Label>
              <Form.Control required type="text" name="name" />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="price"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>new price</Form.Label>
              <Form.Control name="price" required type="number" />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="description"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>Discription</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="description"
              />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="stock-account"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>number in stoke</Form.Label>
              <Form.Control required type="number" name="count" />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Text>
              Category <CloseButton aria-label="Hide" /> (remove selected)
            </Form.Text>
            <Form.Select
              aria-label="Default select example"
              style={{ marginBottom: "3px" }}
              name="category"
            >
              <option>Category name</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Group
              as={Col}
              controlId="stock-account"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>or create new Category</Form.Label>
              <Form.Control required type="text" />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  style={{ marginBottom: "3px" }}
                >
                  <Form.Label>Create new Atribute</Form.Label>
                  <Form.Control required type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  style={{ marginBottom: "3px" }}
                >
                  <Form.Label>Atribute Value</Form.Label>
                  <Form.Control required type="text" name="attribute" />
                </Form.Group>
              </Col>
            </Row>
            <Table hover>
              <thead>
                <tr>
                  <th>Atribute</th>
                  <th>vale</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mobile phone</td>
                  <td>iphone</td>
                  <td>
                    <CloseButton aria-label="Hide" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>images</Form.Label>
              <Form.Control required type="file" size="sm" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {" "}
              submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminCreateproductpage;
