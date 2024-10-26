import { Form } from "react-bootstrap";
function SortOptions() {
  return (
    <>
      <Form.Select size="sm">
        <option>Sort By</option>
        <option value="price_1">Price Low to High</option>
        <option value="price_-1">Price High tO Low</option>
        <option value="rating_-1">Customer Rating</option>
        <option value="name_1">Name A - Z</option>
        <option value="name_-1">Name Z - A</option>
      </Form.Select>
      <Form.Label className="mt-2">
        {" "}
        <p>
          Price range <b style={{ color: "red" }}>5000</b> SAR
        </p>
      </Form.Label>
      <Form.Range min={10} max={1000} step={10} />
    </>
  );
}

export default SortOptions;
