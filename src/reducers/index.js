import { combineReducers } from "redux";
import dashReducer from "./dashReducer";

const reducers = {
  dashReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
