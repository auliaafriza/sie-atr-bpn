import React, { useEffect } from "react";
import KepegawaianBPNGol from "./kepegawaian-atr-bpn-golongan";
import KepegawaianBPNJK from "./kepegawaian-atr-bpn-JK";
import KepegawaianBPNUsia from "./kepegawaian-atr-bpn-usia";
import KepegawaianBPNPendidikan from "./kepegawaian-atr-bpn-pendidikan";
import KepegawaianBPNJabatan from "./kepegawaian-atr-bpn-jabatan";
import KepegawaianBPNMutasi from "./kepegawaian-atr-bpn-mutasi";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { getTahunMutasi } from "../../actions/kepegawaianAction";
import { useDispatch } from "react-redux";

const PegawaiAtr = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
    dispatch(getTahunMutasi());
  }, []);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <KepegawaianBPNGol />
      <KepegawaianBPNPendidikan />
      <KepegawaianBPNJabatan />
      <KepegawaianBPNJK />
      <KepegawaianBPNUsia />
      <KepegawaianBPNMutasi />
    </div>
  );
};

export default PegawaiAtr;
