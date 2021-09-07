import { getBphtbBerkasFilterApi } from "../api/bphtbApi";
import { GET_BPHTB_BERKAS_FILTER } from "./actionTypes";

export const getBphtbBerkasFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_BPHTB_BERKAS_FILTER,
      payload: getBphtbBerkasFilterApi(),
    });
  };
};
