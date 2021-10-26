import React, { useEffect } from "react";
import {
  getSatker,
  getKantor,
  getKanwil,
} from "../../../actions/globalActions";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
  getWilayahPNBP,
} from "../../../actions/pnbpAction";
import { useDispatch } from "react-redux";
import SieSertifikatKonsolidasiKota from "./sie_sertifikat_konsolidasi_kota";
import SieSertifikatJangkaWaktuHak from "./sie_sertifikat_jangka_waktu_hak";
import SieSertifikasiTargetRealisasi from "./sie_sertifikasi_target_realisasi";
import SieSertifikatTahun from "./sie_sertifikasi_tahun";
import SieSertifikatLuasJumlah from "./sie_sertifikat_luas_jumlah";
import SieSeritifikatDiagunkan from "./sie_sertifikat_diagunkan";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";
import { isMobile } from "react-device-detect";

const StatistikSertifikat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBerkasPnbpWilayahFilter());
    dispatch(getBerkasPnbpKantorFilter());
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
    dispatch(getWilayahPNBP());
  }, []);

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
          height: isMobile ? "100%" : "100vh",
        }}
      >
        <SieSertifikatJangkaWaktuHak />
      </div>
    </>
  );
};

export default StatistikSertifikat;
