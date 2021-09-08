import {
  GET_TAHUN,
  GET_TAHUN_PENDING,
  GET_TAHUN_FULFILLED,
  GET_TAHUN_REJECTED,
  GET_KANTAH,
  GET_KANTAH_PENDING,
  GET_KANTAH_FULFILLED,
  GET_KANTAH_REJECTED,
  GET_KANWIL,
  GET_KANWIL_PENDING,
  GET_KANWIL_FULFILLED,
  GET_KANWIL_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  tahun: [],
  kanwil: [],
  kantah: [],
  error: {},
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_TAHUN: {
      return { ...state };
    }
    case GET_TAHUN_PENDING: {
      return { ...state, loading: true };
    }
    case GET_TAHUN_FULFILLED: {
      return {
        ...state,
        tahun: action.payload.data.data,
        loading: false,
      };
    }
    case GET_TAHUN_REJECTED: {
      return {
        ...state,
        loading: false,
        tahun: [],
        errors: action.payload.error,
      };
    }

    case GET_KANTAH: {
      return { ...state };
    }
    case GET_KANTAH_PENDING: {
      return { ...state, loading: true };
    }
    case GET_KANTAH_FULFILLED: {
      return {
        ...state,
        kantah: action.payload.data.data,
        loading: false,
      };
    }
    case GET_KANTAH_REJECTED: {
      return {
        ...state,
        loading: false,
        kantah: [],
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
