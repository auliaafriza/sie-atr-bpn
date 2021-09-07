//PNBP
import {
  GET_KANTOR_REALISASI_PENGGUNAAN,
  GET_KANTOR_REALISASI_PENGGUNAAN_PENDING,
  GET_KANTOR_REALISASI_PENGGUNAAN_FULFILLED,
  GET_KANTOR_REALISASI_PENGGUNAAN_REJECTED,
  GET_PENGEMBALIAN_PNBP_FILTER,
  GET_PENGEMBALIAN_PNBP_FILTER_PENDING,
  GET_PENGEMBALIAN_PNBP_FILTER_FULFILLED,
  GET_PENGEMBALIAN_PNBP_FILTER_REJECTED,
  GET_BERKAS_PNBP_WILAYAH_FILTER,
  GET_BERKAS_PNBP_WILAYAH_FILTER_PENDING,
  GET_BERKAS_PNBP_WILAYAH_FILTER_FULFILLED,
  GET_BERKAS_PNBP_WILAYAH_FILTER_REJECTED,
  GET_BERKAS_PNBP_KANTOR_FILTER,
  GET_BERKAS_PNBP_KANTOR_FILTER_PENDING,
  GET_BERKAS_PNBP_KANTOR_FILTER_FULFILLED,
  GET_BERKAS_PNBP_KANTOR_FILTER_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  realisasiPenggunaanFilter: [],
  pengembalianPnbpFilter: [],
  berkasPnbpWilayah: [],
  berkasPnbpKantor: [],
  error: {},
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_KANTOR_REALISASI_PENGGUNAAN: {
      return { ...state };
    }
    case GET_KANTOR_REALISASI_PENGGUNAAN_PENDING: {
      return { ...state, loading: true };
    }
    case GET_KANTOR_REALISASI_PENGGUNAAN_FULFILLED: {
      return {
        ...state,
        realisasiPenggunaanFilter: action.payload.data.data,
        loading: false,
      };
    }
    case GET_KANTOR_REALISASI_PENGGUNAAN_REJECTED: {
      return {
        ...state,
        loading: false,
        realisasiPenggunaanFilter: [],
        errors: action.payload.error,
      };
    }

    case GET_PENGEMBALIAN_PNBP_FILTER: {
      return { ...state };
    }
    case GET_PENGEMBALIAN_PNBP_FILTER_PENDING: {
      return { ...state, loading: true };
    }
    case GET_PENGEMBALIAN_PNBP_FILTER_FULFILLED: {
      return {
        ...state,
        pengembalianPnbpFilter: action.payload.data.data,
        loading: false,
      };
    }
    case GET_PENGEMBALIAN_PNBP_FILTER_REJECTED: {
      return {
        ...state,
        loading: false,
        pengembalianPnbpFilter: [],
        errors: action.payload.error,
      };
    }

    case GET_BERKAS_PNBP_WILAYAH_FILTER: {
      return { ...state };
    }
    case GET_BERKAS_PNBP_WILAYAH_FILTER_PENDING: {
      return { ...state, loading: true };
    }
    case GET_BERKAS_PNBP_WILAYAH_FILTER_FULFILLED: {
      return {
        ...state,
        berkasPnbpWilayah: action.payload.data.data,
        loading: false,
      };
    }
    case GET_BERKAS_PNBP_WILAYAH_FILTER_REJECTED: {
      return {
        ...state,
        loading: false,
        berkasPnbpWilayah: [],
        errors: action.payload.error,
      };
    }

    case GET_BERKAS_PNBP_KANTOR_FILTER: {
      return { ...state };
    }
    case GET_BERKAS_PNBP_KANTOR_FILTER_PENDING: {
      return { ...state, loading: true };
    }
    case GET_BERKAS_PNBP_KANTOR_FILTER_FULFILLED: {
      return {
        ...state,
        berkasPnbpKantor: action.payload.data.data,
        loading: false,
      };
    }
    case GET_BERKAS_PNBP_KANTOR_FILTER_REJECTED: {
      return {
        ...state,
        loading: false,
        berkasPnbpKantor: [],
        errors: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
