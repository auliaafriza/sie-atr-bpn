import React from "react";
import BPHTBJumlahBerkas from "./bphtb-jumlah-berkas";
import BPHTBJumlahIntegrasi from "./bphtb-jumlah-terintegrasi";

const BPHTBPage = () => {
  return (
    <div style={{ paddingTop: 20 }}>
      <BPHTBJumlahBerkas />
      <BPHTBJumlahIntegrasi />
    </div>
  );
};

export default BPHTBPage;
