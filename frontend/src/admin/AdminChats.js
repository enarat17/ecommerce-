import { Col, Container, Row } from "react-bootstrap";
import AdminLinkComp from "../components/AdminLinkComp";
import AdminChatComp from "../components/AdminChatComp";

function AdminChats() {
  return (
    <Container
      fluid
      style={{ marginTop: 30, display: "flex", flexDirection: "row" }}
    >
      <Row>
        <Col className="col-chat-link">
          <AdminLinkComp />
        </Col>
        <Col style={{ display: "flex", flexDirection: "row" }}>
          <AdminChatComp />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminChats;
