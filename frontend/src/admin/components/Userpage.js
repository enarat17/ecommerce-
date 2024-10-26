import { Container, Table, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Userpage({ getuser, deleteuser }) {
  const [users, setUsers] = useState([]);
  const [userdelete, setUserdelete] = useState(false);

  const deletehandler = async (userid) => {
    const data = await deleteuser(userid);
    if (data === "user is deleted") {
      setUserdelete(!userdelete);
    }
  };
  useEffect(() => {
    const abctrl = new AbortController();
    getuser(abctrl).then((res) => setUsers(res.users));
    return () => {
      abctrl.abort();
    };
  }, [userdelete, getuser]);
  console.log(users);
  return (
    <Container className="tableorders" fluid>
      <Row>
        <Col md={2}>
          <Nav className="order_nav">
            <LinkContainer to="/AdminOrderPage" className="link">
              <Nav.Link>Order</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/AdminProductPage" className="link">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/AdminUsersPage" className="link">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/AdminAnalys" className="link">
              <Nav.Link>Analysis</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/AdminChats" className="link">
              <Nav.Link>Chats</Nav.Link>
            </LinkContainer>

            <Nav.Link className="link">LogOut</Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Frist Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Asmin</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isadmin ? (
                        <i
                          className="bi bi-person-fill-check"
                          style={{ color: "green", fontSize: 25 }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-person-fill-x"
                          style={{ color: "red", fontSize: 25 }}
                        ></i>
                      )}
                    </td>

                    <td style={{ fontSize: 25 }}>
                      <Link to={`/AdminEditUserPage/:${user._id}`}>
                        <i
                          className="bi bi-pencil-square"
                          style={{ color: "Blue" }}
                        ></i>
                      </Link>

                      <Link>
                        <i
                          className="bi bi-trash"
                          style={{ color: "red" }}
                          onClick={() => deletehandler(user._id)}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Userpage;
