export const userreducer = (state = {}, action) => {
  switch (action.type) {
    case "login_user":
      return {
        ...state,
        userregester: action.payload,
      };
    case "logout_user":
      return {};
    default:
      return state;
  }
};
