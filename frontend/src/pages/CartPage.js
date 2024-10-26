import { useSelector } from "react-redux";
import Cartpagecomponant from "./components/Cartpagecomponant";
import { useDispatch } from "react-redux";
import { addtocart } from "../redux/action/cartactions";
import { delete_item_action } from "../redux/action/cartactions";
function CartPage() {
  const dispatch = useDispatch();
  const cart_info = useSelector((state) => state.cart);
  console.log(cart_info);
  const delete_item = (productid, Quantity, price) => {
    console.log(productid, Quantity, price);
    dispatch(delete_item_action(productid, Quantity, price));
  };
  return (
    <Cartpagecomponant
      cart_info={cart_info}
      dispatch={dispatch}
      addtocart={addtocart}
      delete_item={delete_item}
    />
  );
}

export default CartPage;
