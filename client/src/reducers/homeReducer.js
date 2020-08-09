import {
  GET_CANDIDATES,
  GET_CANDIDATES_ERROR,
  GET_USERS_ERROR,
  GET_USERS,
  CLEAR_ERROR,
  ADD_CANDIDATE,
  ADD_VOTE_ERROR,
  ADD_CANDIDATE_ERROR,
  UPDATE_CANDIDATE,
  UPDATE_CANDIDATE_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_ERROR,
} from "../actions/types";

//home state management

const initialState = {
  error: null,
  candidates: null,
  users: null,
  candidate: null,
  isCandidate: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CANDIDATES:
      return {
        ...state,
        loading: false,
        candidates: [...action.payload],
      };
    case ADD_CANDIDATE:
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        isCandidate: action.payload.isCandidate,
        candidate: action.payload.candidate,
        loading: false,
      };
    case DELETE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.filter(
          (item) => item._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.map((item) =>
          item._id === action.payload.candidate_id
            ? action.payload.candidate
            : item
        ),
        candidate: [action.payload.candidate],
        loading: false,
      };
    case UPDATE_CANDIDATE_ERROR:
    case ADD_CANDIDATE_ERROR:
    case GET_USERS_ERROR:
    case DELETE_CANDIDATE_ERROR:
    case GET_CANDIDATES_ERROR:
    case ADD_VOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
