import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

//alert function
export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3500);
  };
};
