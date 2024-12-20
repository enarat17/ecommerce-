import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { getCategories } from "../redux/actions/categoryActions";
import socketIOClient from "socket.io-client";
import { setChatRooms, setSocket, setMessageReceived, removeChatRoom } from "../redux/actions/chatActions";
import { LanguageContext } from "../context/LanguageContext";
import { navbarTranslation } from "../translations/navbarTranslation";
import { FaGlobe, FaUser, FaUserPlus } from "react-icons/fa"; // Import icons

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const t = navbarTranslation[language];
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const rtlStyle = {
    direction: language === "ar" ? "rtl" : "ltr",
    textAlign: language === "ar" ? "right" : "left",
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}/search/${searchQuery}`);
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`);
    } else {
      navigate("/product-list");
    }
  };

  useEffect(() => {
    if (userInfo.isAdmin) {
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 1000000000000));
      socket.on("server sends message from client to admin", ({ user, message }) => {
        dispatch(setSocket(socket));
        dispatch(setChatRooms(user, message));
        dispatch(setMessageReceived(true));
        audio.play();
      });
      socket.on("disconnected", ({ reason, socketId }) => {
        dispatch(removeChatRoom(socketId));
      });
      return () => socket.disconnect();
    }
  }, [dispatch, userInfo.isAdmin]);

  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" style={{ backgroundColor: "#48BA24" }} variant="light">
      <Container style={rtlStyle}>
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="text-white ">{t.storeName}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
          <InputGroup className="mx-auto search-bar" style={{ maxWidth: "500px" }}>
        {/* Dropdown Button with transparent background */}
        <DropdownButton
          id="dropdown-basic-button"
          title={searchCategoryToggle === "All" ? t.all : searchCategoryToggle}
          style={{ backgroundColor: "transparent", border: "none" }}
          className="border-0"
        >
          <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>{t.all}</Dropdown.Item>
          {categories.map((category, id) => (
            <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {/* Search Input */}
        <Form.Control
          onKeyUp={submitHandler}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder={t.search}
        />

        {/* Search Button with conditional border radius */}
        <Button
          onClick={submitHandler}
          variant="outline-secondary"
          style={{
            borderTopLeftRadius: language === "ar" ? "0.25rem" : "0",
            borderBottomLeftRadius: language === "ar" ? "0.25rem" : "0",
            borderTopRightRadius: language === "ar" ? "0" : "0.25rem",
            borderBottomRightRadius: language === "ar" ? "0" : "0.25rem",
          }}
        >
          <i className="bi bi-search text-white"></i>
        </Button>
      </InputGroup>
          </Nav>
          <Nav className="align-items-center">
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  {t.admin}
                  {messageReceived && (
                    <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                  )}
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">
                  {t.myOrders}
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  {t.myProfile}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout())}>{t.logout}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-white">
                    <FaUser className="me-1 text-white" /> {t.login}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-white">
                    <FaUserPlus className="me-1 text-white" /> {t.register}
                  </Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  {itemsCount === 0 ? "" : itemsCount}
                </Badge>
                <i className="bi bi-cart-dash text-white m-1"></i>
                <span className="ms-1 text-white">{t.cart}</span>
              </Nav.Link>
            </LinkContainer>

            {/* Language switcher icon */}
            <Button variant="outline-light" className="ms-2" onClick={toggleLanguage}>
              <FaGlobe />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
