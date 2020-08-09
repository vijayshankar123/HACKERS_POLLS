import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCandidates, getUsers } from "../../actions/homeAction";
import { loadUser } from "../../actions/authAction";
import CandidateItem from "./CandidateItem";
import AddCandidate from "./AddCandidate";
import Header from "./Header";
import Spinner from "./Spinner";
import { addVote } from "../../actions/homeAction";
import { setAlert } from "../../actions/alertAction";

//home page
const Home = ({
  loadUser,
  addVote,
  auth: { user },
  setAlert,
  home: { isCandidate, loading, candidates },
  getUsers,
  getCandidates,
}) => {
  //locally managed states
  const [vote, setVote] = useState("");
  const [toggleHandler, setToggleHandler] = useState(false);
  const changeToggler = () => {
    setToggleHandler(!toggleHandler);
  };

  const onChangeHandler = (user) => {
    setVote(user);
  };

  const getToggleHandler = () => {
    setToggleHandler(!toggleHandler);
  };

  useEffect(() => {
    loadUser();
    getCandidates();
    getUsers();
  }, []);

  //submitting vote to backend
  const submitVote = () => {
    if (vote.length === 0) {
      return setAlert("Please Vote !!", "danger");
    }
    addVote(user._id);
  };
  return (
    <div className="container">
      {!candidates && loading ? (
        <Spinner />
      ) : (
        <div>
          <Header />
          <div className="row">
            <div className="col-md-7">
              {candidates &&
                candidates.map((item) => (
                  <CandidateItem
                    onChangeHandler={onChangeHandler}
                    item={item}
                    vote={vote}
                    key={item._id}
                  />
                ))}
            </div>
            <div className="col-md-5">
              {(isCandidate || (user && user.role === "admin")) && (
                <h5
                  onClick={changeToggler}
                  className=" new-font point text-center"
                >
                  {isCandidate ? (
                    <i className="fas fa-user-edit" />
                  ) : (
                    <i className="fas fa-user-plus" />
                  )}{" "}
                  {isCandidate ? "Edit Candidate" : "Add new Candidate"}
                  {toggleHandler && (
                    <span style={{ float: "right" }}>
                      <i onClick={changeToggler} className="fas fa-caret-up" />
                    </span>
                  )}
                </h5>
              )}

              <AddCandidate
                toggleHandler={toggleHandler}
                getToggleHandler={getToggleHandler}
              />
            </div>
          </div>
          <div className="stickyy-button fill-submit">
            <button
              onClick={submitVote}
              style={
                user && user.votes > 0
                  ? { background: "red" }
                  : { background: "blue" }
              }
              className={`btn btn-primary text-center `}
              disabled={user && user.votes > 0}
            >
              SUBMIT YOUR VOTE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  home: state.home,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addVote,
  setAlert,
  loadUser,
  getUsers,
  getCandidates,
})(Home);
