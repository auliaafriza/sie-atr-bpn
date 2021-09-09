import React from "react";
import SieSertifikatKonsolidasiKota from "./sie_sertifikat_konsolidasi_kota";
import SieSertifikatJangkaWaktuHak from "./sie_sertifikat_jangka_waktu_hak";
import SieSertifikasiTargetRealisasi from "./sie_sertifikasi_target_realisasi";
import SieSertifikatTahun from "./sie_sertifikasi_tahun";
import SieSertifikatLuasJumlah from "./sie_sertifikat_luas_jumlah";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";

const StatistikSertifikat = () => {
  return (
    <>
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
          // height: "75vh",
        }}
      >
        <SieSertifikatKonsolidasiKota />
        <SieSertifikatJangkaWaktuHak />
      </div>
      <SieSertifikatTahun />
      <SieSertifikasiTargetRealisasi />
      <SieSertifikatLuasJumlah />
    </>
  );
};

export default StatistikSertifikat;
