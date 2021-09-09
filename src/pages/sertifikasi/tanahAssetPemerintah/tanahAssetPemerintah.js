import React, { useEffect } from "react";
import AssetPemerintah from "./sie_sertifikasi_aset_pemerintah";
import { getWilayah } from "../../../actions/globalActions";
import { useDispatch } from "react-redux";

const PTSL = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWilayah());
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        height: "75vh",
      }}
    >
      <AssetPemerintah />
    </div>
  );
};

export default PTSL;
