import { Container, Table, Row, Col, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Productspage({ getproducts, deleteproduct }) {
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDelete] = useState(false);

  const deletehandler = async (productid) => {
    const data = await deleteproduct(productid);
    console.log(data.message);
    if (data.message === "product deleted") {
      setDelete(!deleteProduct);
      //window.location.reload(false);
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    getproducts(abctrl).then((res) => setProducts(res.all_prosuct));
    return () => {
      abctrl.abort();
    };
  }, [deleteproduct, getproducts]);
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
          <div style={{ display: "flex", flexDirection: "row", width: 300 }}>
            <h2 style={{ marginRight: "5px" }}>Product List</h2>
            <LinkContainer to="/AdminCreateProduct">
              <Button variant="primary" style={{ margin: 3 }}>
                {" "}
                Create new
              </Button>
            </LinkContainer>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product, index) => (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td style={{ color: "blue" }}>{product.category}</td>
                    <td style={{ fontSize: 25 }}>
                      <Link to={`/AdminEditProduct/${product._id}`}>
                        <i
                          className="bi bi-pencil-square"
                          style={{ color: "Blue" }}
                        ></i>
                      </Link>

                      <Link>
                        <i
                          className="bi bi-trash"
                          style={{ color: "red" }}
                          onClick={() => deletehandler(product._id)}
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

export default Productspage;
