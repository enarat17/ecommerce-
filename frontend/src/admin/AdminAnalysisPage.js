import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import AdminLinkComp from "../components/AdminLinkComp";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
function AdminAnalysisPage() {
  const data = [
    {
      name: "10.00 Pm",
      "2022 year": 5000,
      "2021 year": 6500,
    },
    {
      name: "2.00 Pm",
      "2022 year": 7000,
      "2021 year": 6500,
    },
    {
      name: "9.00 Pm",
      "2022 year": 4520,
      "2021 year": 3200,
    },
    {
      name: "5.00 Pm",
      "2022 year": 1700,
      "2021 year": 2000,
    },
    {
      name: "11.00 Pm",
      "2022 year": 4580,
      "2021 year": 9000,
    },
    {
      name: "3.00 Pm",
      "2022 year": 5000,
      "2021 year": 6500,
    },
    {
      name: "7.00 Pm",
      "2022 year": 2852,
      "2021 year": 6500,
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <AdminLinkComp></AdminLinkComp>
        </Col>
        <Col md={10}>
          <FormGroup controlId="fistdate" style={{ marginBottom: 10 }}>
            <h1 style={{ marginTop: 10, marginBottom: 10 }}>Analysis Page </h1>
            <Form.Label>select the first date</Form.Label>
            <Form.Control
              type="date"
              name="fistdate"
              placeholder="select the first date"
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="lastdate">
            <Form.Label>select the last date</Form.Label>
            <Form.Control
              type="date"
              name="lastdate"
              placeholder="select the last date"
            ></Form.Control>
          </FormGroup>
          <ResponsiveContainer width="90%" height={500}>
            <LineChart data={data}>
              <XAxis dataKey="name" allowDuplicatedCategory={false} />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="2022 year"
                stroke="#8884d8"
                strokeWidth={4}
              />
              <Line
                type="monotone"
                dataKey="2021 year"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminAnalysisPage;
