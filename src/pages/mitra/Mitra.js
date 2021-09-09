import React, { useEffect } from "react";
import StatistikKemitraan from "./statistikKemitraan";
import { getTahun, getKantah, getKanwil } from "../../actions/mitraAction";
import { useDispatch } from "react-redux";
import bgImg from "../../assets/img/mitra.jpg";

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
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        height: "100vh",
      }}
    >
      <StatistikKemitraan />
    </div>
  );
};

export default Mitra;
