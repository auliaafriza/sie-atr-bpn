import {
  getKanwilApi,
  getTipeHakApi,
  getNamaProfileApi,
} from "../api/sertifikasiApi";
import {
  GET_KANWIL_SERTIFIKASI,
  GET_TIPE_HAK_SERTIFIKASI,
  GET_NAMA_PROFILE,
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

export const getNamaProfile = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_NAMA_PROFILE,
      payload: getNamaProfileApi(),
    });
  };
};
