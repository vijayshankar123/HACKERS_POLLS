import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/layout/Home";
import PrivateRoute from "./routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
//redux actions
import { loadUser } from "./actions/authAction";
//redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
