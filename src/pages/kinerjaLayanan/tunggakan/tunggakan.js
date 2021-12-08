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
import SieTunggakan from "./sie-tunggakan";
import SieTunggakanWilayah from "./sie-tunggakan-wilayah";
import bgImg from "../../../assets/img/kinerjaV2.jpg";

const LayananUmum = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBerkasPnbpWilayahFilter());
    dispatch(getBerkasPnbpKantorFilter());
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
    dispatch(getWilayahPNBP());
  }, []);

  return (
    <div
      style={{
        paddingBottom: 20,
        paddingTop: 20,
        backgroundImage: `url(${bgImg})`,
        // height: "100vh",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <SieTunggakanWilayah />
      <SieTunggakan />
    </div>
  );
};

export default LayananUmum;
