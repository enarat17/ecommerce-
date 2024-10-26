import { Button, Form, FormGroup, FormLabel, Toast } from "react-bootstrap";
import { Fragment } from "react";
import { useState } from "react";

function AdminChatComp() {
  const [show, setshow] = useState(true);
  const [show2, setshow2] = useState(true);
  function close() {
    setshow(!show);
  }
  function close2() {
    setshow2(!show2);
  }
  return (
    <>
      <Toast show={show} onClose={close} style={{ marginRight: 5 }}>
        <Toast.Header>
          <strong className="me-auto">Mohamed samy</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="message-body">
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <p className="user-mes">
                <b>User : </b>Hello, world! This is a toast message.
              </p>
              <p>
                <b>Admin : </b>Hello, world! This is a toast message.
              </p>
            </Fragment>
          ))}
        </Toast.Body>
        <Form className="from-chat-comp">
          <FormGroup>
            <FormLabel>
              <b>Write message</b>
            </FormLabel>
            <Form.Control as="textarea" rows={2}></Form.Control>
            <Button variant="primary"> Send</Button>
          </FormGroup>
        </Form>
      </Toast>
      <Toast show={show2} onClose={close2} style={{ marginRight: 5 }}>
        <Toast.Header>
          <strong className="me-auto">Mohamed samy</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="message-body">
          {Array.from({ length: 20 }).map((_, index) => (
            <Fragment key={index}>
              <p className="user-mes">
                <b>User : </b>Hello, world! This is a toast message.
              </p>
              <p>
                <b>Admin : </b>Hello, world! This is a toast message.
              </p>
            </Fragment>
          ))}
        </Toast.Body>
        <Form className="from-chat-comp">
          <FormGroup>
            <FormLabel>
              <b>Write message</b>
            </FormLabel>
            <Form.Control as="textarea" rows={2}></Form.Control>
            <Button variant="primary"> Send</Button>
          </FormGroup>
        </Form>
      </Toast>
    </>
  );
}

export default AdminChatComp;
