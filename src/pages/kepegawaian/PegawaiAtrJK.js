import React, { useEffect } from "react";
import KepegawaianBPNJK from "./kepegawaian-atr-bpn-JK";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { getTahunMutasi } from "../../actions/kepegawaianAction";
import { useDispatch } from "react-redux";
import bgImg from "../../assets/img/kepegawaian.jpg";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
  getWilayahPNBP,
} from "../../actions/pnbpAction";
import { isMobile } from "react-device-detect";

const PegawaiAtr = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
    dispatch(getTahunMutasi());
    dispatch(getWilayahPNBP());
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "100vh",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        paddingTop: 20,
      }}
    >
      <KepegawaianBPNJK />
    </div>
  );
};

export default PegawaiAtr;
