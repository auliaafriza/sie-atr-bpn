import React, { useEffect } from "react";
import KepegawaianBPNGol from "./kepegawaian-atr-bpn-golongan";
import KepegawaianBPNJK from "./kepegawaian-atr-bpn-JK";
import KepegawaianBPNUsia from "./kepegawaian-atr-bpn-usia";
import KepegawaianBPNPendidikan from "./kepegawaian-atr-bpn-pendidikan";
import KepegawaianBPNJabatan from "./kepegawaian-atr-bpn-jabatan";
import KepegawaianBPNMutasi from "./kepegawaian-atr-bpn-mutasi";
import KepegawaianBPN from "./kepegawaian-atr-bpn";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { getTahunMutasi } from "../../actions/kepegawaianAction";
import { useDispatch } from "react-redux";
import bgImg from "../../assets/img/kepegawaian.jpg";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
  getWilayahPNBP,
} from "../../actions/pnbpAction";

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
        height: "100%",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        paddingTop: 20,
      }}
    >
      <KepegawaianBPN />
    </div>
  );
};

export default PegawaiAtr;
