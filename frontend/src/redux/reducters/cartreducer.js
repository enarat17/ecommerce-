//import * as actionTypes from "../consts/cartconst";
const intialstate_cart = {
  cartitems: [],
  itemscounts: 0,
  cartsubtotal: 0,
};

export const cartreducer = (state = intialstate_cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload);
      const product_is_added_now = action.payload;
      const product_is_exiest = state.cartitems.find(
        (x) => x?.productid === product_is_added_now.productid
      );
      const cuurentstate = { ...state };

      if (product_is_exiest) {
        cuurentstate.itemscounts = 0;
        cuurentstate.cartsubtotal = 0;
        cuurentstate.cartitems = state.cartitems.map((x) => {
          if (x?.productid === product_is_added_now.productid) {
            cuurentstate.itemscounts += Number(product_is_added_now.Quantity);
            const sum = Number(
              product_is_added_now.Quantity * product_is_added_now.price
            );
            cuurentstate.cartsubtotal += sum;
          } else {
            cuurentstate.itemscounts += Number(x.Quantity);
            const sum = Number(x.Quantity * x.price);
            cuurentstate.cartsubtotal += sum;
          }
          return x.productid === product_is_exiest.productid
            ? product_is_added_now
            : x;
        });
      } else {
        cuurentstate.itemscounts += Number(product_is_added_now.Quantity);
        const sum = Number(
          product_is_added_now.Quantity * product_is_added_now.price
        );
        cuurentstate.cartsubtotal += sum;
        cuurentstate.cartitems = [...state.cartitems, product_is_added_now];
      }
      return cuurentstate;

    case "DELETE_ITEM":
      return {
        ...state,
        cartitems: state.cartitems.filter(
          (x) => x.productid !== action.payload.productid
        ),
        itemscounts: state.itemscounts - action.payload.Quantity,
        cartsubtotal:
          state.cartsubtotal - action.payload.Quantity * action.payload.price,
      };

    case "REMOVE_ALL_CART":
      return {
        state: intialstate_cart,
      };

    default:
      return state;
  }
};
