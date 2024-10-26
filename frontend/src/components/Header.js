import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/useractions";
import { useEffect } from "react";
import { get_categories } from "../redux/action/catrgoriesactions";
function Header() {
  const dispatch = useDispatch();
  const { userregester } = useSelector((state) => state.user);
  const itemscounts = useSelector((state) => state.cart.itemscounts);

  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="mb-1"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <LinkContainer to="/">
          <Navbar.Brand>PRODUCTS</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <InputGroup>
            <DropdownButton id="dropdown-basic-button" title="ALL">
              <Dropdown.Item>ELECTRONICS</Dropdown.Item>
              <Dropdown.Item>CONDUCTORS</Dropdown.Item>
              <Dropdown.Item>WIRES</Dropdown.Item>
            </DropdownButton>

            <Form.Control
              type="text"
              size="sm"
              placeholder="Search for any item ..."
            />
            <Button variant="secondary">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Nav>

        <Nav>
          <Navbar.Collapse id="responsive-navbar-nav">
            {userregester && userregester?.isadmin ? (
              <LinkContainer to="/AdminOrderPage">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            ) : (
              ""
            )}

            {userregester && userregester?.name ? (
              <>
                <NavDropdown
                  title={userregester ? userregester?.name : ""}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="/UserOrder"
                    as={Link}
                    to="/UserOrder"
                  >
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="/User" as={Link} to="/User">
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dispatch(logout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              ""
            )}

            <LinkContainer to="/LoginPage">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <Nav.Link as={Link} to="RegesterPage" eventKey="RegesterPage">
              Regester
            </Nav.Link>

            {userregester && userregester.name && itemscounts > 0 ? (
              <LinkContainer to="/CartPage">
                <Nav.Link>
                  <Stack direction="horizontal" gap={1}>
                    <Badge bg="danger">{itemscounts ? itemscounts : ""}</Badge>
                    <i className="bi bi-cart-dash"></i>cart
                  </Stack>
                </Nav.Link>
              </LinkContainer>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
