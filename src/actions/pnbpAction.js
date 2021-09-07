import {
  getRealisasiPenggunaanFilterApi,
  getPengembalianPnbpFilterApi,
  getBerkasPnbpWilayahFilterApi,
  getBerkasPnbpKantorFilterApi,
  getPersentasePnbpBelanjaFilterApi,
  getPnbpKinerjaBerkasFilterApi,
} from "../api/pnbpApi";
import {
  GET_KANTOR_REALISASI_PENGGUNAAN,
  GET_PENGEMBALIAN_PNBP_FILTER,
  GET_BERKAS_PNBP_WILAYAH_FILTER,
  GET_BERKAS_PNBP_KANTOR_FILTER,
  GET_PERSENTASE_PNBP_BELANJA_FILTER,
  GET_PNBP_KINERJA_BERKAS_FILTER,
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

export const getBerkasPnbpWilayahFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_BERKAS_PNBP_WILAYAH_FILTER,
      payload: getBerkasPnbpWilayahFilterApi(),
    });
  };
};

export const getBerkasPnbpKantorFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_BERKAS_PNBP_KANTOR_FILTER,
      payload: getBerkasPnbpKantorFilterApi(),
    });
  };
};

export const getPersentasePnbpBelanjaFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_PERSENTASE_PNBP_BELANJA_FILTER,
      payload: getPersentasePnbpBelanjaFilterApi(),
    });
  };
};

export const getPnbpKinerjaBerkasFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_PNBP_KINERJA_BERKAS_FILTER,
      payload: getPnbpKinerjaBerkasFilterApi(),
    });
  };
};
