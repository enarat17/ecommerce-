import { Form } from "react-bootstrap";
function SortingAtributes() {
  const Features = [
    "feature1",
    "feature2",
    "feature3",
    "feature4",
    "feature5",
    "feature6",
  ];
  return (
    <>
      <h6> Feature Sorting</h6>
      <Form>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`default-${index}`} className="mb-3">
            <Form.Check // prettier-ignore
              index={index}
              id={`default2-${index}`}
              label={Features[index]}
            />
          </div>
        ))}
      </Form>
    </>
  );
}

export default SortingAtributes;
