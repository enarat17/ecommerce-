import axios from "axios";

export const get_categories = () => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:5000/api/v1/category`, {
    withCredentials: true,
  });
  dispatch({
    type: "getcategry_const",
    payload: data,
  });
};

export const Save_Attr =
  (key, value, choosencategory) => async (dispatch, getState) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/category/attr",
      { key, value, choosencategory },
      { withCredentials: true }
    );
    if (data) {
      dispatch({
        type: "save_attr",
        payload: data,
      });
    }
  };
