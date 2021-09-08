import React from "react";
import SieSertifikatKonsolidasiKota from "./sie_sertifikat_konsolidasi_kota";
import SieSertifikatJangkaWaktuHak from "./sie_sertifikat_jangka_waktu_hak";
import SieSertifikasiTargetRealisasi from "./sie_sertifikasi_target_realisasi";
import SieSertifikatTahun from "./sie_sertifikasi_tahun";

const StatistikSertifikat = () => {
  return (
    <>
      <SieSertifikatKonsolidasiKota />
      <SieSertifikatJangkaWaktuHak />
      <SieSertifikatTahun />
      <SieSertifikasiTargetRealisasi />
    </>
  );
};

export default StatistikSertifikat;
