import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({ showCartMessage, setShowCartMessage,isRtl }) => {
  const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

  return (
    <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>{isRtl?"تمت إضافة المنتج إلي عربة تسوقك":"The product was added to your cart!"}</Alert.Heading>
      <p>
        <Button variant="success" onClick={goBack}>{isRtl ? "عودة للخلف":"Go back"}</Button>{" "}
        <Link to="/cart">
          <Button variant="danger">{isRtl ? "الذهاب إلي العربة":"Go to cart"}</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
