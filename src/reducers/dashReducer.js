import {
  GET_PAGU_MP,
  GET_PAGU_MP_PENDING,
  GET_PAGU_MP_FULFILLED,
  GET_PAGU_MP_REJECTED,
  GET_ANGGARAN_REALISASI,
  GET_ANGGARAN_REALISASI_PENDING,
  GET_ANGGARAN_REALISASI_FULFILLED,
  GET_ANGGARAN_REALISASI_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  paguMp: [],
  error: {},
  anggaranRealisasi: [],
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_PAGU_MP: {
      return { ...state };
    }
    case GET_PAGU_MP_PENDING: {
      return { ...state, loading: true };
    }
    case GET_PAGU_MP_FULFILLED: {
      return {
        ...state,
        paguMp: action.payload.data,
        loading: false,
      };
    }
    case GET_PAGU_MP_REJECTED: {
      return {
        ...state,
        loading: false,
        paguMp: [],
        errors: action.payload.error,
      };
    }

    case GET_ANGGARAN_REALISASI: {
      return { ...state };
    }
    case GET_ANGGARAN_REALISASI_PENDING: {
      return { ...state, loading: true };
    }
    case GET_ANGGARAN_REALISASI_FULFILLED: {
      return {
        ...state,
        anggaranRealisasi: action.payload.data,
        loading: false,
      };
    }
    case GET_ANGGARAN_REALISASI_REJECTED: {
      return {
        ...state,
        loading: false,
        anggaranRealisasi: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
