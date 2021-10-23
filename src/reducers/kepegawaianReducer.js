//PNBP
import {
  GET_TAHUN_MUTASI,
  GET_TAHUN_MUTASI_PENDING,
  GET_TAHUN_MUTASI_FULFILLED,
  GET_TAHUN_MUTASI_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  tahunMutasi: [],
  error: {},
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_TAHUN_MUTASI: {
      return { ...state };
    }
    case GET_TAHUN_MUTASI_PENDING: {
      return { ...state, loading: true };
    }
    case GET_TAHUN_MUTASI_FULFILLED: {
      let temp = [];
      action.payload.data.data && action.payload.data.data.length != 0
        ? action.payload.data.data.map((item) =>
            temp.push({ tahun: item.tahun.toString() })
          )
        : [];
      return {
        ...state,
        tahunMutasi: temp,
        loading: false,
      };
    }
    case GET_TAHUN_MUTASI_REJECTED: {
      return {
        ...state,
        loading: false,
        tahunMutasi: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
