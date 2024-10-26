import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../redux/action/useractions";
function AdminLinkComp() {
  const dispatch = useDispatch();
  return (
    <>
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

        <Nav.Link className="link" onClick={() => dispatch(logout())}>
          LogOut
        </Nav.Link>
      </Nav>
    </>
  );
}

export default AdminLinkComp;
