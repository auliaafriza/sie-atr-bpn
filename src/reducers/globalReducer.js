import {
  GET_SATKER,
  GET_SATKER_PENDING,
  GET_SATKER_FULFILLED,
  GET_SATKER_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  satker: [],
  error: {},
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_SATKER: {
      return { ...state };
    }
    case GET_SATKER_PENDING: {
      return { ...state, loading: true };
    }
    case GET_SATKER_FULFILLED: {
      return {
        ...state,
        satker: action.payload.data,
        loading: false,
      };
    }
    case GET_SATKER_REJECTED: {
      return {
        ...state,
        loading: false,
        paguMp: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
