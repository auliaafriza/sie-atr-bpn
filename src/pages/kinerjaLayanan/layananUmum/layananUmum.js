import React from "react";
import SieLayananJumlahPerjenis from "./sie_layanan_jumlah_perjenis";
import SieLayananKebutuhanKantorPertanahan from "./sie_layanan_kebutuhan_kantor_pertanahan";

const LayananUmum = () => {
  return (
    <>
      <SieLayananJumlahPerjenis />
      <SieLayananKebutuhanKantorPertanahan />
    </>
  );
};

export default LayananUmum;
