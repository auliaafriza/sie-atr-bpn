import React, { useEffect } from "react";
import {
  getSatker,
  getKantor,
  getKanwil,
} from "../../../actions/globalActions";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
  getWilayahPNBP,
} from "../../../actions/pnbpAction";
import { useDispatch } from "react-redux";
import IndexTanah from "./psn-index-nilai-tanah";
import IndexTanahKantah from "./psn-index-nilai-tanah-kantah";
import bgImg from "../../../assets/img/psn.jpg";
import { isMobile } from "react-device-detect";

const PengadaanTanah = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWilayahPNBP());
    dispatch(getBerkasPnbpKantorFilter());
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        // height: isMobile ? "100%" : "100vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <IndexTanah />
      <IndexTanahKantah />
    </div>
  );
};

export default PengadaanTanah;
