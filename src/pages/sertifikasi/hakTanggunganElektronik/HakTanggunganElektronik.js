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
import SieHtDitutupPerkantor from "./sie_ht_ditutup_perkantor";
import SieHtJumlahKantorTahun from "./sie_ht_jumlah_kantor_tahun";
import SieHTUploadPpatIpSama from "./sie_ht_upload_ppat_ipsama ";
import SieHTTanpaPeriksa from "./sie_ht_terbit_tanpa_periksa";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";
const HakTanggunganElektronik = () => {
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
          height: "100vh",
        }}
      >
        <SieHtJumlahKantorTahun />
        {/* <SieHTTanpaPeriksa /> */}
        {/* <SieHTUploadPpatIpSama /> */}
      </div>
      {/* <SieHtDitutupPerkantor /> */}
    </div>
  );
};

export default HakTanggunganElektronik;
