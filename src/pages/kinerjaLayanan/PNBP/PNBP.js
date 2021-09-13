import React, { useEffect } from "react";
import {
  getSatker,
  getKantor,
  getKanwil,
} from "../../../actions/globalActions";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
} from "../../../actions/pnbpAction";
import { useDispatch } from "react-redux";
import NilaiPNBP from "./sie_psn_nilai_pnbp";
import bgImg from "../../../assets/img/kinerja.jpg";

const PTSL = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBerkasPnbpWilayahFilter());
    dispatch(getBerkasPnbpKantorFilter());
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);
  return (
    <div>
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        <NilaiPNBP />
      </div>
    </div>
  );
};

export default PTSL;
