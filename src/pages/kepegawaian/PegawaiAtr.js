import React from "react";
import KepegawaianBPNGol from "./kepegawaian-atr-bpn-golongan";
import KepegawaianBPNJK from "./kepegawaian-atr-bpn-JK";
import KepegawaianBPNUsia from "./kepegawaian-atr-bpn-usia";
import KepegawaianBPNPendidikan from "./kepegawaian-atr-bpn-pendidikan";
import KepegawaianBPNJabatan from "./kepegawaian-atr-bpn-jabatan";

const PegawaiAtr = () => {
  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <KepegawaianBPNGol />
      <KepegawaianBPNPendidikan />
      <KepegawaianBPNJabatan />
      <KepegawaianBPNJK />
      <KepegawaianBPNUsia />
    </div>
  );
};

export default PegawaiAtr;
