import React from "react";
import SieLayananJumlahPerjenis from "./sie_layanan_jumlah_perjenis";
import SieLayananKebutuhanKantorPertanahan from "./sie_layanan_kebutuhan_kantor_pertanahan";
import bgImg from "../../../assets/img/kinerja.jpg";

const LayananUmum = () => {
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
      <SieLayananJumlahPerjenis />
      <SieLayananKebutuhanKantorPertanahan />
    </div>
  );
};

export default LayananUmum;
