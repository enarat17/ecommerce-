export const get_categories = (state = [], action) => {
  switch (action.type) {
    case "getcategry_const":
      return {
        ...state,
        categories: action.payload,
      };
    case "save_attr":
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};
