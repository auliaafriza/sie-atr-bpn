import {
  getRealisasiPenggunaanFilterApi,
  getPengembalianPnbpFilterApi,
} from "../api/pnbpApi";
import {
  GET_KANTOR_REALISASI_PENGGUNAAN,
  GET_PENGEMBALIAN_PNBP_FILTER,
} from "./actionTypes";

export const getRealisasiPenggunaanFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANTOR_REALISASI_PENGGUNAAN,
      payload: getRealisasiPenggunaanFilterApi(),
    });
  };
};

export const getPengembalianPnbpFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_PENGEMBALIAN_PNBP_FILTER,
      payload: getPengembalianPnbpFilterApi(),
    });
  };
};
