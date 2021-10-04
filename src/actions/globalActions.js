import {
  getSatkerApi,
  getKantorApi,
  getKanwilApi,
  getWilayahApi,
  getWhoamiApi,
} from "../api/globalApi";
import {
  GET_SATKER,
  GET_KANTOR,
  GET_KANWIL,
  GET_WILAYAH,
  GET_WHO_AM_I,
  RESET_WHO_AM_I,
  SET_USERNAME,
} from "./actionTypes";

export const getSatker = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_SATKER,
      payload: getSatkerApi(),
    });
  };
};

export const getKantor = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANTOR,
      payload: getKantorApi(),
    });
  };
};

export const getKanwil = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANWIL,
      payload: getKanwilApi(),
    });
  };
};

export const getWilayah = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_WILAYAH,
      payload: getWilayahApi(),
    });
  };
};

export const getWhoami = (user) => {
  return (dispatch) => {
    return dispatch({
      type: GET_WHO_AM_I,
      payload: getWhoamiApi(user),
    });
  };
};

export const resetWhoami = () => {
  return (dispatch) => {
    return dispatch({
      type: RESET_WHO_AM_I,
    });
  };
};

export const setUsername = (data) => {
  return (dispatch) => {
    return dispatch({
      type: SET_USERNAME,
      payload: data,
    });
  };
};
