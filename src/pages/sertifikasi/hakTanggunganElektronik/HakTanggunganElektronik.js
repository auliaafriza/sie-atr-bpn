import React from "react";
import SieHtDitutupPerkantor from "./sie_ht_ditutup_perkantor";
import SieHtJumlahKantorTahun from "./sie_ht_jumlah_kantor_tahun";
import SieHTUploadPpatIpSama from "./sie_ht_upload_ppat_ipsama ";
const HakTanggunganElektronik = () => {
  return (
    <>
      <SieHtJumlahKantorTahun />
      <SieHtDitutupPerkantor />
      <SieHTUploadPpatIpSama />
    </>
  );
};

export default HakTanggunganElektronik;
