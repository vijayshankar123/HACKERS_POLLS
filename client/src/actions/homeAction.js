import {
  GET_CANDIDATES,
  GET_CANDIDATES_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  CLEAR_ERROR,
  ADD_CANDIDATE,
  ADD_CANDIDATE_ERROR,
  UPDATE_CANDIDATE,
  UPDATE_CANDIDATE_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_ERROR,
  ADD_VOTE,
  ADD_VOTE_ERROR,
} from "./types";

import axios from "axios";
import { setAlert } from "./alertAction";
import { loadUser } from "./authAction";

//getting candidates from server on loading home page
export const getCandidates = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/candidates/all");
      dispatch({
        type: GET_CANDIDATES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_CANDIDATES_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//getting users from server on loading
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/users/all");
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_USERS_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//adding candidates to the DB
export const addCandidates = ({
  user_id,
  no_of_challenges_solved,
  candidate_expertise_level,
  data_Structure,
  algorithms,
  java,
  python,
  nodejs,
}) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        user_id,
        no_of_challenges_solved,
        candidate_expertise_level,
        data_Structure,
        algorithms,
        java,
        python,
        nodejs,
      });

      const res = await axios.post("/api/candidate/create", body, config);
      dispatch({
        type: ADD_CANDIDATE,
        payload: res.data,
      });
      dispatch(setAlert("New Candidate added ! ", "success"));
    } catch (err) {
      dispatch({
        type: ADD_CANDIDATE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//updating candidates in both front and backend
export const updateCandidate = ({
  candidate_id,
  no_of_challenges_solved,
  candidate_expertise_level,
  data_Structure,
  algorithms,
  java,
  python,
  nodejs,
}) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        no_of_challenges_solved,
        candidate_expertise_level,
        data_Structure,
        algorithms,
        java,
        python,
        nodejs,
      });
      const res = await axios.put(
        "/api/candidate/" + candidate_id,
        body,
        config
      );
      dispatch({
        type: UPDATE_CANDIDATE,
        payload: { candidate_id, candidate: res.data },
      });
      dispatch(setAlert("Candidate details successfully updated", "success"));
    } catch (err) {
      dispatch({
        type: UPDATE_CANDIDATE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//deleting candidate from DB
export const deleteCandidate = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete("/api/candidate/" + id);
      dispatch({
        type: DELETE_CANDIDATE,
        payload: id,
      });
      dispatch(setAlert(res.data, "success"));
    } catch (err) {
      dispatch({
        type: DELETE_CANDIDATE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//adding single vote to user
export const addVote = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/user/vote/" + id);
      dispatch({
        type: ADD_VOTE,
      });
      dispatch(setAlert(res.data.msg, "success"));
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: ADD_VOTE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//clearing error
export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
