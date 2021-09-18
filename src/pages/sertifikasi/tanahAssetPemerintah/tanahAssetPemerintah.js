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
import AssetPemerintah from "./sie_sertifikasi_aset_pemerintah";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";

const PTSL = () => {
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
    <div
      style={{
        backgroundImage: `url(${imgSertifikasi})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingBottom: 20,
        width: "100%",
        height: "100vh",
      }}
    >
      <AssetPemerintah />
    </div>
  );
};

export default PTSL;
