import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import { Link } from "react-router-dom";

//navbar component
const Navbar = ({ logout, auth, home: { users } }) => {
  return (
    <nav className="stickyy-top navbar navbar-expand-md navbar-light bg-dark">
      <Link className="navbar-brand nav-colors" to="/">
        <h5 className="new-font">
          <i className="fas fa-hat-cowboy" /> Hacker Polls
        </h5>
      </Link>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon nav-colors"></span>
      </button>
      <div className="collapse navbar-collapse nav-items" id="navbarNav">
        <ul className="navbar-nav">
          {auth && auth.isAuthenticated && !auth.loading ? (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-colors nav-link new-font " to="#">
                  Total Users : {users && users.length}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-colors nav-link new-font " to="#">
                  <i className="far fa-user mr-1 ml-1" />
                  {"\t"} Signed In as {auth.user && auth.user.username}
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  onClick={logout}
                  className="nav-link nav-colors new-font"
                  to="#"
                >
                  Logout
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-colors nav-link new-font" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link nav-colors new-font" to="/login">
                  Login
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  home: state.home,
});
export default connect(mapStateToProps, { logout })(Navbar);
