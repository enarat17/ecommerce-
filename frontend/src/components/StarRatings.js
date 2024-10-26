import { Form } from "react-bootstrap";
//import ReactStars from "react-stars";
import ReactStars from "react-rating-stars-component";
import React from "react";
function StarRatings() {
  return (
    <>
      <h6>Star Rating</h6>
      <Form>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mb-3 flex-row">
            <Form.Check // prettier-ignore
              index={index}
              id={`default-${index}`}
              label={<ReactStars count={5 - index} color="#ffd700" size={15} />}
            />
          </div>
        ))}
      </Form>
    </>
  );
}

export default StarRatings;
