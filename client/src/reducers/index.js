import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import home from "./homeReducer";
export default combineReducers({
  alert,
  auth,
  home,
});
