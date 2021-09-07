//PNBP
import {
  GET_BPHTB_BERKAS_FILTER,
  GET_BPHTB_BERKAS_FILTER_PENDING,
  GET_BPHTB_BERKAS_FILTER_FULFILLED,
  GET_BPHTB_BERKAS_FILTER_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  bphtbBerkasFilter: [],
  error: {},
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_BPHTB_BERKAS_FILTER: {
      return { ...state };
    }
    case GET_BPHTB_BERKAS_FILTER_PENDING: {
      return { ...state, loading: true };
    }
    case GET_BPHTB_BERKAS_FILTER_FULFILLED: {
      return {
        ...state,
        bphtbBerkasFilter: action.payload.data.data,
        loading: false,
      };
    }
    case GET_BPHTB_BERKAS_FILTER_REJECTED: {
      return {
        ...state,
        loading: false,
        bphtbBerkasFilter: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
