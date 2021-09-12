import React, { useEffect } from "react";
import {
  getSatker,
  getKantor,
  getKanwil,
  getWhoami,
} from "../../actions/globalActions";
import { useDispatch } from "react-redux";

const DashHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
    dispatch(getWhoami());
  }, []);

  return <div></div>;
};

export default DashHome;
