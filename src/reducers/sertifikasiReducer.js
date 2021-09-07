import {
  GET_KANWIL_SERTIFIKASI,
  GET_KANWIL_SERTIFIKASI_PENDING,
  GET_KANWIL_SERTIFIKASI_FULFILLED,
  GET_KANWIL_SERTIFIKASI_REJECTED,
  GET_TIPE_HAK_SERTIFIKASI,
  GET_TIPE_HAK_SERTIFIKASI_PENDING,
  GET_TIPE_HAK_SERTIFIKASI_FULFILLED,
  GET_TIPE_HAK_SERTIFIKASI_REJECTED,
  GET_NAMA_PROFILE,
  GET_NAMA_PROFILE_PENDING,
  GET_NAMA_PROFILE_FULFILLED,
  GET_NAMA_PROFILE_REJECTED,
} from "../actions/actionTypes";

const initialstate = {
  kanwil: {
    loading: false,
    data: [],
    error: "",
  },
  tipeHak: {
    loading: false,
    data: [],
    error: "",
  },
  namaProfile: {
    loading: false,
    data: [],
    error: "",
  },
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_KANWIL_SERTIFIKASI: {
      return { ...state };
    }
    case GET_KANWIL_SERTIFIKASI_PENDING: {
      return { ...state, kanwil: { ...state.kanwil, loading: true } };
    }
    case GET_KANWIL_SERTIFIKASI_FULFILLED: {
      return {
        ...state,
        kanwil: {
          ...state.kanwil,
          data: action.payload.data.data,
          loading: false,
        },
      };
    }
    case GET_KANWIL_SERTIFIKASI_REJECTED: {
      return {
        ...state,
        kanwil: {
          ...state.kanwil,
          data: [],
          loading: false,
          error: "Gagal mengambil kanwil",
        },
      };
    }
    case GET_TIPE_HAK_SERTIFIKASI: {
      return { ...state };
    }
    case GET_TIPE_HAK_SERTIFIKASI_PENDING: {
      return { ...state, tipeHak: { ...state.tipeHak, loading: true } };
    }
    case GET_TIPE_HAK_SERTIFIKASI_FULFILLED: {
      return {
        ...state,
        tipeHak: {
          ...state.tipeHak,
          data: action.payload.data.data,
          loading: false,
        },
      };
    }
    case GET_TIPE_HAK_SERTIFIKASI_REJECTED: {
      return {
        ...state,
        tipeHak: {
          ...state.tipeHak,
          data: [],
          loading: false,
          error: "Gagal mengambil tipe hak",
        },
      };
    }
    case GET_NAMA_PROFILE: {
      return { ...state };
    }
    case GET_NAMA_PROFILE_PENDING: {
      return { ...state, namaProfile: { ...state.namaProfile, loading: true } };
    }
    case GET_NAMA_PROFILE_FULFILLED: {
      return {
        ...state,
        namaProfile: {
          ...state.namaProfile,
          data: action.payload.data.data,
          loading: false,
        },
      };
    }
    case GET_NAMA_PROFILE_REJECTED: {
      return {
        ...state,
        namaProfile: {
          ...state.namaProfile,
          data: [],
          loading: false,
          error: "Gagal mengambil tipe hak",
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
