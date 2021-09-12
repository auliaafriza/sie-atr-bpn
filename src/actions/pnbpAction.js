import {
  getRealisasiPenggunaanFilterApi,
  getPengembalianPnbpFilterApi,
  getBerkasPnbpWilayahFilterApi,
  getBerkasPnbpKantorFilterApi,
  getPersentasePnbpBelanjaFilterApi,
  getPnbpKinerjaBerkasFilterApi,
  getWilayahPNBPApi,
  getKantorPNBPApi,
} from "../api/pnbpApi";
import {
  GET_KANTOR_REALISASI_PENGGUNAAN,
  GET_PENGEMBALIAN_PNBP_FILTER,
  GET_BERKAS_PNBP_WILAYAH_FILTER,
  GET_BERKAS_PNBP_KANTOR_FILTER,
  GET_PERSENTASE_PNBP_BELANJA_FILTER,
  GET_PNBP_KINERJA_BERKAS_FILTER,
  GET_WILAYAH_PNBP,
  GET_KANTOR_PNBP,
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

export const getWilayahPNBP = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_WILAYAH_PNBP,
      payload: getWilayahPNBPApi(),
    });
  };
};

export const getKantorPNBP = (data) => {
  return (dispatch) => {
    return dispatch({
      type: GET_KANTOR_PNBP,
      payload: getKantorPNBPApi(data),
    });
  };
};
