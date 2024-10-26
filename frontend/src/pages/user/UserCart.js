import Usercartorderdetails from "../components/Usercartorderdetails";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addtocart } from "../../redux/action/cartactions";
import { delete_item_action } from "../../redux/action/cartactions";
import { loadScript } from "@paypal/paypal-js";
import { useState } from "react";
import { remove_all_cart } from "../../redux/action/cartactions";

const getuser = async (userid) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/users/${userid}`,
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

const makeorder = async (order) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/v1/orders/makeorder",
    { ...order },
    {
      withCredentials: true,
    }
  );
  return data;
};
const updateispaid = async (orderid) => {
  const { data } = axios.put(
    `http://localhost:5000/api/v1/orders/paid/${orderid}`,
    {},
    {
      withCredentials: true, // This line ensures cookies are sent with the request
    }
  );
  return data;
};

function UserCart() {
  const dispatch = useDispatch();
  const [paymentmethod, setpaymentmethod] = useState("cod");
  const { userregester } = useSelector((state) => state.user);
  const cartinfo = useSelector((state) => state.cart);
  console.log(cartinfo);
  console.log(userregester);
  const delete_item = (productid, Quantity, price) => {
    console.log(productid, Quantity, price);
    dispatch(delete_item_action(productid, Quantity, price));
  };
  const changecount_func = (productid, count) => {
    dispatch(addtocart(productid, count));
  };
  const paymenthandler = (e) => {
    setpaymentmethod(e.target.value);
  };
  ////////////////////////////////////////////////////////////////////////////////

  const load_paypall_scrept = (cartitems, cartSubtotal) => {
    loadScript({
      "client-id":
        "AQIFYYyC-oySljLo2_f1lWJys2Nasr5BJktuGfKS9Z8lMSlVIZZifX5WRYaJd2HSSpl46tH4OiTguyx3",
    })
      .then((paypal) =>
        paypal
          .Buttons(buttons(cartitems, cartSubtotal))
          .render("#paypall_container")
      )
      .catch((err) => console.log(err));
  };

  const buttons = (cartitems, cartSubtotal) => {
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: cartSubtotal,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: cartSubtotal,
                  },
                },
              },
              items: cartitems.map((product) => {
                return {
                  name: product.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: product.price,
                  },
                  quantity: product.quantity,
                };
              }),
            },
          ],
        });
      },
      onCancel: function (data, action) {
        return alert("canceld");
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          console.log(details);
          var transaction =
            details.purchase_units[0].payments.captures[0].status;
          if (transaction === "COMPLETED") {
            const orderdata = {
              orderTotal: {
                cartSubtotal: cartinfo.cartsubtotal,
                itemsCount: cartinfo.itemscounts,
              },
              cartItems: cartinfo.cartitems.map((item, i) => {
                return {
                  name: item.name,
                  price: item.price,
                  image: { path: item.image?.path ? item.image.path : null },
                  quantity: item.Quantity,
                  count: item.count,
                };
              }),
              paymentMethod: paymentmethod,
            };
            makeorder(orderdata).then((data) => {
              if (data) {
                console.log(data);
                console.log(data.order._id);
                // i will updata order done paid
                updateispaid(data.order._id).then((res) => console.log(res));
              }
            });
            console.log("update order to is paid ");
            // window.location.href = "/";
            // dispatch(remove_all_cart());

            alert("Transaction completed successfully!");
          }
        });
      },
    };
  };

  return (
    <Usercartorderdetails
      userregester={userregester}
      getuser={getuser}
      cartinfo={cartinfo}
      delete_item={delete_item}
      changecount_func={changecount_func}
      makeorder={makeorder}
      loadScript={loadScript}
      load_paypall_scrept={load_paypall_scrept}
      paymenthandler={paymenthandler}
      paymentmethod={paymentmethod}
    />
  );
}

export default UserCart;
