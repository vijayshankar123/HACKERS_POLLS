import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { register, clearError } from "../../actions/authAction";
import { setAlert } from "../../actions/alertAction";
import { connect } from "react-redux";

//signup component
const Signup = ({
  history,
  isAuthenticated,
  clearError,
  register,
  error,
  setAlert,
}) => {
  const [signup, setSignup] = useState({
    role: "user",
    username: "",
    password: "",
    password2: "",
  });

  const { role, username, password, password2 } = signup;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);

  //onChanging the form
  const onChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  //on submitting the form
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      window.alert("passwords do not match! Try again !!!");
    } else {
      register({ role, username, password, history });
      if (error) {
        setAlert(error, "danger");
        clearError();
      }
      setSignup({
        role: "",
        username: "",
        password: "",
        password2: "",
      });
    }
  };
  //redirecting already signed up users
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div style={{ marginTop: "100px" }} className=" col-md-5 offset-md-3">
      <h1 className="large text-primary text-center">Sign Up</h1>
      <p className="lead text-center new-font">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <br />
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group horizontal">
          <div>
            <input
              type="radio"
              name="role"
              id="user"
              value="user"
              checked={role === "user"}
              onChange={onChange}
              required
            />{" "}
            <label htmlFor="user">User</label>
          </div>

          <div>
            <input
              type="radio"
              name="role"
              id="admin"
              value="admin"
              checked={role === "admin"}
              onChange={onChange}
              required
            />{" "}
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <input type="submit" className="btn btn-primary " value="Register" />
        </div>
      </form>
      <p className=" text-center my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register, clearError })(
  Signup
);
