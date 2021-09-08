import { combineReducers } from "redux";
import dashReducer from "./dashReducer";
import globalReducer from "./globalReducer";
import sertifikasi from "./sertifikasiReducer";
import pnbp from "./pnbpReducer";
import bphtb from "./bhptbReducer";
import kepegawaian from "./kepegawaianReducer";
import mitra from "./mitraReducer";

const reducers = {
  dashReducer,
  globalReducer,
  sertifikasi,
  pnbp,
  bphtb,
  kepegawaian,
  mitra,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
