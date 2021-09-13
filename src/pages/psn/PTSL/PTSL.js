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
import SiePsnPtsl5Peringkat from "./sie_psn_ptsl_5peringkat";
import RealisasiPerkegiatan from "./sie_ptsl_realisasi_perkegiatan";
import NilaiBPHTB from "./sie_psn_nilai_bphtb";
import NilaiPNBP from "./sie_psn_nilai_pnbp";
import NilaiHt from "./sie_psn_nilai_ht";
import NilaiJualBeli from "./sie_psn_nilai_jual_beli";
import NilaiTanahperKantah from "./sie_psn_nilai_tanah_perkantah";
import bgImg from "../../../assets/img/psn.jpg";

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
          // height: "100vh",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        <NilaiBPHTB />
        <NilaiPNBP />
        {/* <SiePsnPtsl5Peringkat /> */}
        {/* <RealisasiPerkegiatan /> */}
      </div>
      <NilaiHt />
      <NilaiJualBeli />
      <NilaiTanahperKantah />
    </div>
  );
};

export default PTSL;
