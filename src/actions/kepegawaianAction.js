import { getTahunMutasiApi } from "../api/kepegawaianApi";
import { GET_TAHUN_MUTASI } from "./actionTypes";

export const getTahunMutasi = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_TAHUN_MUTASI,
      payload: getTahunMutasiApi(),
    });
  };
};
