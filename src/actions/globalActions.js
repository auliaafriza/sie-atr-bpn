import { getSatkerApi } from "../api/globalApi";
import { GET_SATKER } from "./actionTypes";

export const getSatker = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_SATKER,
      payload: getSatkerApi(),
    });
  };
};
