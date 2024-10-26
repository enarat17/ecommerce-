import { Container, Table, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import AdminLinkComp from "../../components/AdminLinkComp";
import { useState, useEffect } from "react";

function Orderspage({ getorders }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // const abrtcl = new AbortController();
    getorders()
      .then((res) => {
        setOrders(res.orders);
        console.log(res.orders);
      })
      .catch((res) => console.log(res.response.data));

    //return () => abrtcl.abort();
  }, [getorders]);
  return (
    <Container className="tableorders" fluid>
      <Row>
        <Col md={2}>
          <AdminLinkComp />
        </Col>
        <Col md={10}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Deliverd</th>
                <th>Payment method</th>
                <th>Other details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td>
                      {order.user !== null
                        ? order.user.name + " " + order.user.lastname
                        : null}
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td style={{ color: "blue" }}>
                      {order.orderTotal.cartSubtotal}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <i
                          className="bi bi-check-lg"
                          style={{ color: "green", fontSize: 25 }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-x"
                          style={{ color: "red", fontSize: 25 }}
                        ></i>
                      )}
                    </td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <Link to={`/AdminOrderDetails/${order._id}`}>
                        {" "}
                        Order details
                      </Link>
                    </td>
                  </tr>
                ))}
              {/* <tr>
                <td> 2</td>
                <td>mohamed smay</td>
                <td>2024-03-5</td>
                <td style={{ color: "blue" }}>100</td>
                <td style={{ color: "red", fontSize: 25 }}>
                  <i class="bi bi-x"></i>
                </td>
                <td>cash</td>
                <td>
                  <Link to="/AdminOrderDetails"> Order details</Link>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Orderspage;
