import React, { useEffect } from "react";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
  getWilayahPNBP,
} from "../../actions/pnbpAction";
import { useDispatch } from "react-redux";
import BPHTBJumlahBerkas from "./bphtb-jumlah-berkas";
import BPHTBJumlahIntegrasi from "./bphtb-jumlah-terintegrasi";
import NilaiBPHTB from "./sie_psn_nilai_bphtb";
import bgImg from "../../assets/img/asetKeuangan.jpg";

const BPHTBPage = () => {
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
    <div>
      <div
        style={{
          paddingTop: 20,
          backgroundImage: `url(${bgImg})`,
          // height: "100vh",
          width: "100wh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          maeginBottom: 20,
        }}
      >
        <BPHTBJumlahBerkas />
        <BPHTBJumlahIntegrasi />
      </div>
      <NilaiBPHTB />
    </div>
  );
};

export default BPHTBPage;
