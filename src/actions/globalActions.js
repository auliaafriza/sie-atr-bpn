import {
  getSatkerApi,
  getKantorApi,
  getKanwilApi,
  getWilayahApi,
} from "../api/globalApi";
import { GET_SATKER, GET_KANTOR, GET_KANWIL, GET_WILAYAH } from "./actionTypes";

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
