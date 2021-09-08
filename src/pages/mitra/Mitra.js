import React, { useEffect } from "react";
import StatistikKemitraan from "./statistikKemitraan";
import { getTahun, getKantah, getKanwil } from "../../actions/mitraAction";
import { useDispatch } from "react-redux";

const Mitra = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKantah());
    dispatch(getTahun());
    dispatch(getKanwil());
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        height: "90vh",
      }}
    >
      <StatistikKemitraan />
    </div>
  );
};

export default Mitra;
