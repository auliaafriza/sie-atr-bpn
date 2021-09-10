import React from "react";
import BPHTBJumlahBerkas from "./bphtb-jumlah-berkas";
import BPHTBJumlahIntegrasi from "./bphtb-jumlah-terintegrasi";
import bgImg from "../../assets/img/asetKeuangan.jpg";

const BPHTBPage = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        backgroundImage: `url(${bgImg})`,
        height: "100%",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      {/* <BPHTBJumlahBerkas /> */}
      <BPHTBJumlahIntegrasi />
    </div>
  );
};

export default BPHTBPage;
