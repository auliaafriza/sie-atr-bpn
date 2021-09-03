import { combineReducers } from "redux";
import dashReducer from "./dashReducer";
import globalReducer from "./globalReducer";

const reducers = {
  dashReducer,
  globalReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
