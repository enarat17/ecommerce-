import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
function AdminEditUserPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row md={6} className="user_edit_page">
        <Col md={6}>
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
          >
            <LinkContainer to="/AdminUsersPage">
              <Button variant="primary"> go back </Button>
            </LinkContainer>
            <h2>
              <b>User Edit Page</b>
            </h2>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              controlId="frist_name"
              style={{ marginBottom: 3 }}
            >
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="samy"
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="lastname"
              style={{ marginBottom: 3 }}
            >
              <Form.Label>last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="last name "
                defaultValue="mohamed"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="lastname"
              style={{ marginBottom: 5 }}
            >
              <FormGroup style={{ marginBottom: 5 }}>
                <Form.Label>email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="email"
                  defaultValue="samy@gmail.com"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </FormGroup>
              <Form.Check type="checkbox" label="Is Admin" id="CHEK_BOX" />
            </Form.Group>

            <Button variant="primary" type="submit">
              {" "}
              Edit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditUserPage;
