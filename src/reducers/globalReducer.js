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
  GET_WILAYAH,
  GET_WILAYAH_PENDING,
  GET_WILAYAH_FULFILLED,
  GET_WILAYAH_REJECTED,
  GET_WHO_AM_I,
  GET_WHO_AM_I_PENDING,
  GET_WHO_AM_I_FULFILLED,
  GET_WHO_AM_I_REJECTED,
  RESET_WHO_AM_I,
  SET_USERNAME,
} from "../actions/actionTypes";

const initialstate = {
  loading: false,
  satker: [],
  kanwil: [],
  kantor: [],
  wilayah: [],
  whoAmI: "",
  error: {},
  status: "",
  user: "",
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

    case GET_WILAYAH: {
      return { ...state };
    }
    case GET_WILAYAH_PENDING: {
      return { ...state, loading: true };
    }
    case GET_WILAYAH_FULFILLED: {
      return {
        ...state,
        wilayah: action.payload.data.data,
        loading: false,
      };
    }
    case GET_WILAYAH_REJECTED: {
      return {
        ...state,
        loading: false,
        wilayah: [],
        errors: action.payload.error,
      };
    }

    case GET_WHO_AM_I: {
      return { ...state };
    }
    case GET_WHO_AM_I_PENDING: {
      return { ...state, loading: true };
    }
    case GET_WHO_AM_I_FULFILLED: {
      let data =
        action.payload.data.data && action.payload.data.data.nama
          ? action.payload.data.data.nama
          : "";
      return {
        ...state,
        whoAmI: data,
        loading: false,
        status: "success",
      };
    }
    case GET_WHO_AM_I_REJECTED: {
      return {
        ...state,
        loading: false,
        whoAmI: "",
        errors: action.payload.error,
        status: "failed",
      };
    }
    case RESET_WHO_AM_I: {
      return {
        ...state,
        loading: false,
        whoAmI: "",
        status: "",
      };
    }
    case SET_USERNAME: {
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
