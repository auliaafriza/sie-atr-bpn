import { getPaguMpApi, getAnggaranRealisasiApi } from "../api/dashApi";
import { GET_PAGU_MP, GET_ANGGARAN_REALISASI } from "./actionTypes";

export const getPaguMp = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_PAGU_MP,
      payload: getPaguMpApi(),
    });
  };
};

export const getAnggaranRealisasi = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_ANGGARAN_REALISASI,
      payload: getAnggaranRealisasiApi(),
    });
  };
};
