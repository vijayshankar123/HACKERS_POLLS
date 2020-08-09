import axios from "axios";
import { setAlert } from "./alertAction";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  USER_LOADED,
  USER_LOADED_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";

//load user
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_ERROR,
      });
    }
  };
};

//Register a user

export const register = ({ role, username, password, history }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ role, username, password });
    try {
      const res = await axios.post("/api/user", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Account successfully created", "success"));
      history.push("/home");
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

//Login a user

export const log_in = ({ username, password, history }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Successfully signed in", "success"));
      dispatch(loadUser());
      history.push("/home");
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

//clearing errors from state
export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};

//logout
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
    dispatch(setAlert("You have successfully logged out!", "success"));
  };
};
