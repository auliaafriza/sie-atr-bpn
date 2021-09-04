import { combineReducers } from "redux";
import dashReducer from "./dashReducer";
import globalReducer from "./globalReducer";
import sertifikasi from "./sertifikasiReducer";
const reducers = {
  dashReducer,
  globalReducer,
  sertifikasi,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
