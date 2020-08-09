import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { log_in, clearError } from "../../actions/authAction";
import { setAlert } from "../../actions/alertAction";
import { connect } from "react-redux";

//Login form
const Login = ({
  history,
  isAuthenticated,
  clearError,
  log_in,
  error,
  setAlert,
}) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const { username, password } = login;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);
  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
    log_in({ username, password, history });
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    setLogin({
      username: "",
      password: "",
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div style={{ marginTop: "100px" }} className=" col-md-5 offset-md-3">
      <h1 className="large text-primary text-center">Log In</h1>
      <p className="lead text-center new-font">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <br />
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>

        <div className="text-center">
          <input type="submit" className="btn btn-primary " value="Login" />
        </div>
      </form>
      <p className=" text-center my-1">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, log_in, clearError })(
  Login
);
