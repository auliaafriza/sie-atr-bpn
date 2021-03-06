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
import SieLayananJumlahPerjenis from "./sie_layanan_jumlah_perjenis";
import SieLayananKebutuhanKantorPertanahan from "./sie_layanan_kebutuhan_kantor_pertanahan";
import SieLayananBerkas from "./sie-layanan-kinerja-berkas";
import bgImg from "../../../assets/img/kinerjaV2.jpg";
import { isMobile } from "react-device-detect";

const LayananUmum = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBerkasPnbpWilayahFilter());
    dispatch(getBerkasPnbpKantorFilter());
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);

  return (
    <div
      style={{
        paddingBottom: 20,
        paddingTop: 20,
        backgroundImage: `url(${bgImg})`,
        height: "100%",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <SieLayananBerkas />
    </div>
  );
};

export default LayananUmum;
