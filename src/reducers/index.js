import { combineReducers } from "redux";
import dashReducer from "./dashReducer";
import globalReducer from "./globalReducer";
import sertifikasi from "./sertifikasiReducer";
import pnbp from "./pnbpReducer";
import bphtb from "./bhptbReducer";

const reducers = {
  dashReducer,
  globalReducer,
  sertifikasi,
  pnbp,
  bphtb,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
