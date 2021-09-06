import React, { useEffect } from "react";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { useDispatch } from "react-redux";

const DashHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);

  return <div></div>;
};

export default DashHome;
