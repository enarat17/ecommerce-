import { useEffect, useState } from "react";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function Userorderpagecomp({ get_orders }) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    get_orders()
      .then((res) => setorders(res.orders))
      .catch((err) => console.log("no order for this user"));
  }, [get_orders]);

  return (
    <Container className="tableorders">
      <Row className="mb-3">
        <h1>
          <b>Orders Page</b>
        </h1>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Deliverd</th>
            <th>Other details</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <>
              <tr key={index}>
                <td> {index + 1}</td>
                <td>you</td>
                <td>{order.createdAt}</td>
                <td style={{ color: "blue" }}>
                  {" "}
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
                <td>
                  <Link to={`/UserOrderDetails/${order._id}`}>
                    {" "}
                    Order details
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Userorderpagecomp;
