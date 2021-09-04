import {
  GET_SATKER,
  GET_SATKER_PENDING,
  GET_SATKER_FULFILLED,
  GET_SATKER_REJECTED,
  GET_KANTOR,
  GET_KANTOR_PENDING,
  GET_KANTOR_FULFILLED,
  GET_KANTOR_REJECTED,
  GET_KANWIL,
  GET_KANWIL_PENDING,
  GET_KANWIL_FULFILLED,
  GET_KANWIL_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  satker: [],
  kanwil: [],
  kantor: [],
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
        satker: action.payload.data.data,
        loading: false,
      };
    }
    case GET_SATKER_REJECTED: {
      return {
        ...state,
        loading: false,
        satker: [],
        errors: action.payload.error,
      };
    }

    case GET_KANTOR: {
      return { ...state };
    }
    case GET_KANTOR_PENDING: {
      return { ...state, loading: true };
    }
    case GET_KANTOR_FULFILLED: {
      return {
        ...state,
        kantor: action.payload.data.data,
        loading: false,
      };
    }
    case GET_KANTOR_REJECTED: {
      return {
        ...state,
        loading: false,
        kantor: [],
        errors: action.payload.error,
      };
    }

    case GET_KANWIL: {
      return { ...state };
    }
    case GET_KANWIL_PENDING: {
      return { ...state, loading: true };
    }
    case GET_KANWIL_FULFILLED: {
      return {
        ...state,
        kanwil: action.payload.data.data,
        loading: false,
      };
    }
    case GET_KANWIL_REJECTED: {
      return {
        ...state,
        loading: false,
        kanwil: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
