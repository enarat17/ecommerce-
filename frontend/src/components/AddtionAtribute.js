import { Fragment } from "react";
import { Form } from "react-bootstrap";
function AddtionAtribute() {
  const addtionfeature = [
    { color: ["red", "white", "black", "other"] },
    { Size: ["XL", "L", "M"] },
  ];
  return (
    <>
      {addtionfeature.map((item, index) => (
        <div key={index} className="my-3">
          <h6>{Object.keys(item)}</h6>
          {item[Object.keys(item)].map((item, i) => (
            <Form.Check
              key={i} // prettier-ignore
              id={`${item}-${i}`}
              label={item}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default AddtionAtribute;
