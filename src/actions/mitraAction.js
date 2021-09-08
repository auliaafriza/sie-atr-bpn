import { getTahunApi, getKantahApi, getKanwilApi } from "../api/mitraApi";
import { GET_TAHUN, GET_KANTAH, GET_KANWIL } from "./actionTypes";

export const getTahun = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_TAHUN,
      payload: getTahunApi(),
    });
  };
};

export const getKantah = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANTAH,
      payload: getKantahApi(),
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
