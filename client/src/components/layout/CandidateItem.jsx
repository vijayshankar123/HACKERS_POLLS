import React, { useState } from "react";
import { deleteCandidate } from "../../actions/homeAction";
import { connect } from "react-redux";

//candidate component
const CandidateItem = ({
  user,
  deleteCandidate,
  vote,
  onChangeHandler,
  item,
}) => {
  const [toggleUser, setToggleUser] = useState(false);

  //sending vote to the parent(Home) component
  const onChange = () => {
    onChangeHandler(item.name);
  };

  //hiding/unhiding candidate detail
  const onClick = () => {
    setToggleUser(!toggleUser);
  };

  //deleting candidate profile
  const deleteHandler = () => {
    deleteCandidate(item._id);
  };
  return (
    <div className="tras">
      <div className="card mt-3 user-infom">
        <div>
          <div className="card-header center-flex ">
            <small className="center-vote-row">
              <div onClick={onClick} className="point">
                <strong>{item && item.name.toUpperCase()}</strong>
              </div>
              <div
                className={`card expert-style color${
                  item && item.candidate_expertise_level
                }`}
              >
                {item && item.candidate_expertise_level}
              </div>
            </small>
            <div className="center-vote">
              <small>
                <label className="text-muted" htmlFor={item.id}>
                  Vote
                </label>
              </small>
              <input
                type="radio"
                onChange={onChange}
                name={item.name}
                value={item.name}
                checked={vote === item.name}
                disabled={user && user.votes > 0}
                id={item._id}
              />
            </div>
            <div className="point">
              <i
                onClick={onClick}
                className={toggleUser ? "fas fa-caret-up" : "fas fa-caret-down"}
              ></i>
            </div>
          </div>
        </div>

        {toggleUser && (
          <div className="card-body">
            <p>
              <strong>
                No of Challenges Solved : {item && item.no_of_challenges_solved}
              </strong>
            </p>
            <p>
              <i>Data Structure : </i>
              <div
                className={`card expert-style color${
                  item && item.expert_in.data_Structure
                }`}
              >
                {item && item.expert_in.data_Structure}
              </div>
            </p>
            <p>
              <i>Algorithms :</i>
              <div
                className={`card expert-style color${
                  item && item.expert_in.algorithms
                }`}
              >
                {item && item.expert_in.algorithms}
              </div>
            </p>

            <p>
              <i>Nodejs :</i>
              <div
                className={`card expert-style color${
                  item && item.expert_in.nodejs
                }`}
              >
                {item && item.expert_in.nodejs}
              </div>
            </p>
            <p>
              <i>Python :</i>
              <div
                className={`card expert-style color${
                  item && item.expert_in.python
                }`}
              >
                {item && item.expert_in.python}
              </div>
            </p>
            <p>
              <i>Java :</i>
              <div
                className={`card expert-style color${
                  item && item.expert_in.java
                }`}
              >
                {item && item.expert_in.java}
              </div>
            </p>
          </div>
        )}
      </div>
      {user && user.role === "admin" && (
        <div className="point" onClick={deleteHandler}>
          <i className="fas fa-trash trash" />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteCandidate })(CandidateItem);
