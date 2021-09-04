import { getKanwilApi, getTipeHakApi } from "../api/sertifikasiApi";
import {
  GET_KANWIL_SERTIFIKASI,
  GET_TIPE_HAK_SERTIFIKASI,
} from "./actionTypes";

export const getKanwil = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANWIL_SERTIFIKASI,
      payload: getKanwilApi(),
    });
  };
};

export const getTipeHak = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_TIPE_HAK_SERTIFIKASI,
      payload: getTipeHakApi(),
    });
  };
};
