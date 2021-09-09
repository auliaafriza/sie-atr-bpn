import React from "react";
import SieHtDitutupPerkantor from "./sie_ht_ditutup_perkantor";
import SieHtJumlahKantorTahun from "./sie_ht_jumlah_kantor_tahun";
import SieHTUploadPpatIpSama from "./sie_ht_upload_ppat_ipsama ";
import SieHTTanpaPeriksa from "./sie_ht_terbit_tanpa_periksa";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";
const HakTanggunganElektronik = () => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          backgroundImage: `url(${imgSertifikasi})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // zIndex: 1,
          paddingTop: 20,
          paddingBottom: 20,
          width: "100%",
          // opacity: "0.5",
          // height: "100vh",
        }}
      >
        <SieHTTanpaPeriksa />
        <SieHTUploadPpatIpSama />
      </div>

      <SieHtJumlahKantorTahun />
      <SieHtDitutupPerkantor />
    </div>
  );
};

export default HakTanggunganElektronik;
