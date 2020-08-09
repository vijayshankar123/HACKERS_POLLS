import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

//landing page
const Landing = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className=" new-font x-large">Hacker Polls</h1>
          <p className=" new-font lead">
            Sign up to Vote for your favourite candidate
          </p>
          <div className="buttons">
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Landing);
