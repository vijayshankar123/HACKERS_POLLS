import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
  USER_LOADED,
  USER_LOADED_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

//auth state management

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,

        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,

        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:

    case USER_LOADED_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// {isCandidate && (
//   <h5
//     onClick={changeToggler}
//     className=" new-font point text-center"
//   >
//     <i className="fas fa-user-edit" /> Edit Candidate
//   </h5>
// )}
// {user && user.role === "admin" && (
//   <h5
//     onClick={changeToggler}
//     className=" new-font point text-center"
//   >
//     <i className="fas fa-user-plus" /> Add New Candidate
//   </h5>
// )}

// {(isCandidate || (user && user.role === "admin")) &&
//   toggleHandler && (
//     <span style={{ float: "right" }}>
//       <i onClick={changeToggler} className="fas fa-caret-up" />
//     </span>
//   )}
