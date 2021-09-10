import React, { useEffect } from "react";
import AssetPemerintah from "./sie_sertifikasi_aset_pemerintah";
import { getWilayah } from "../../../actions/globalActions";
import { useDispatch } from "react-redux";
import imgSertifikasi from "./../../../assets/img/sertifikasi.jpg";

const PTSL = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWilayah());
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
