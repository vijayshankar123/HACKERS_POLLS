import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertAction";
import {
  addCandidates,
  clearError,
  updateCandidate,
} from "../../actions/homeAction";

//adding and editing candidate form

const AddCandidate = ({
  getToggleHandler,
  updateCandidate,
  addCandidates,
  setAlert,
  clearError,
  toggleHandler,
  home: { candidate, candidates, isCandidate, error, users },
}) => {
  const [form, setForm] = useState({
    user_id: null,
    no_of_challenges_solved: null,
    data_Structure: null,
    candidate_expertise_level: null,
    algorithms: null,
    java: null,
    python: null,
    nodejs: null,
  });
  //locally managed state
  const [rating, setRating] = useState([1, 2, 3, 4, 5]);

  const {
    user_id,
    no_of_challenges_solved,
    data_Structure,
    candidate_expertise_level,
    algorithms,
    java,
    python,
    nodejs,
  } = form;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  //editing logic
  useEffect(() => {
    if (candidate) {
      setForm({
        no_of_challenges_solved: candidate[0].no_of_challenges_solved,
        data_Structure: candidate[0].expert_in.data_Structure,
        candidate_expertise_level: candidate[0].candidate_expertise_level,
        algorithms: candidate[0].expert_in.algorithms,
        java: candidate[0].expert_in.java,
        python: candidate[0].expert_in.python,
        nodejs: candidate[0].expert_in.nodejs,
      });
    }
  }, [candidate, candidates]);

  //onchanging of input fields
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //on submitting form
  const onSubmit = (e) => {
    e.preventDefault();

    //checking whether to update or add new record
    isCandidate
      ? updateCandidate({
          candidate_id: candidate[0]._id,
          no_of_challenges_solved,
          candidate_expertise_level,
          data_Structure,
          algorithms,
          java,
          python,
          nodejs,
        })
      : addCandidates({
          user_id,
          no_of_challenges_solved,
          candidate_expertise_level,
          data_Structure,
          algorithms,
          java,
          python,
          nodejs,
        });

    getToggleHandler();
    if (error) {
      setAlert(error, "danger");
      clearError();
    } else {
      setForm({
        user_id: null,
        no_of_challenges_solved: null,
        data_Structure: null,
        algorithms: null,
        candidate_expertise_level: null,
        java: null,
        python: null,
        nodejs: null,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {toggleHandler && (
        <div>
          <div className="form-group">
            {!isCandidate && (
              <select
                className="form-control"
                name="user_id"
                onChange={onChange}
                required
              >
                <option value="">Select User</option>

                {users &&
                  users.map((user) => (
                    <option
                      className="list-item"
                      key={user._id}
                      value={user._id}
                    >
                      {user.username}
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <div className="input-number">
              <label htmlFor="one">Number of challenges solved</label>
              <input
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  paddingLeft: "20px",
                }}
                type="number"
                min="1"
                name="no_of_challenges_solved"
                id="one"
                value={no_of_challenges_solved}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            {isCandidate && <small>candidate expertise level</small>}
            <select
              className="form-control"
              name="candidate_expertise_level"
              onChange={onChange}
              required
            >
              <option value="">Candidate expertise level</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(candidate_expertise_level) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <br />
          <div>
            <h6 className=" new-font text-center">
              Rate Candidate's skills (1 to 5)
            </h6>
          </div>

          <div className="form-group">
            {isCandidate && <small>data Structure</small>}

            <select
              className="form-control"
              name="data_Structure"
              onChange={onChange}
              required
            >
              <option value="">Data Structure</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(data_Structure) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group">
            {isCandidate && <small>algorithms</small>}

            <select
              className="form-control"
              name="algorithms"
              onChange={onChange}
              required
            >
              <option value="">Algorithms</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(algorithms) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group">
            {isCandidate && <small>java</small>}

            <select
              className="form-control"
              name="java"
              onChange={onChange}
              required
            >
              <option value="">Java</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(java) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group">
            {isCandidate && <small>python</small>}

            <select
              className="form-control"
              name="python"
              onChange={onChange}
              required
            >
              <option value="">Python</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(python) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group">
            {isCandidate && <small>nodejs</small>}

            <select
              className="form-control"
              name="nodejs"
              onChange={onChange}
              required
            >
              <option value="">Nodejs</option>
              {rating &&
                rating.map((user) =>
                  user === parseInt(nodejs) ? (
                    <option className="list-item" key={user} selected>
                      {user}
                    </option>
                  ) : (
                    <option className="list-item" key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn btn-primary"
              value={isCandidate ? "Update Candidate" : " Add New Candidate"}
            />
          </div>
        </div>
      )}
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  home: state.home,
});
export default connect(mapStateToProps, {
  clearError,
  setAlert,
  addCandidates,
  updateCandidate,
})(AddCandidate);
