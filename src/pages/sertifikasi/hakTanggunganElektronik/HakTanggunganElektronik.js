import React from "react";
import SieHtDitutupPerkantor from "./sie_ht_ditutup_perkantor";
import SieHtJumlahKantorTahun from "./sie_ht_jumlah_kantor_tahun";
import SieHTUploadPpatIpSama from "./sie_ht_upload_ppat_ipsama ";
import SieHTTanpaPeriksa from "./sie_ht_terbit_tanpa_periksa";
const HakTanggunganElektronik = () => {
  return (
    <div style={{ marginBottom: 20 }}>
      <SieHtJumlahKantorTahun />
      <SieHtDitutupPerkantor />
      <SieHTUploadPpatIpSama />
      <SieHTTanpaPeriksa />
    </div>
  );
};

export default HakTanggunganElektronik;
