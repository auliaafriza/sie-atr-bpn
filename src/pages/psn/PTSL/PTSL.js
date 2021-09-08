import React from "react";
import SiePsnPtsl5Peringkat from "./sie_psn_ptsl_5peringkat";
import RealisasiPerkegiatan from "./sie_ptsl_realisasi_perkegiatan";

const PTSL = () => {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
      }}
    >
      <SiePsnPtsl5Peringkat />
      <RealisasiPerkegiatan />
    </div>
  );
};

export default PTSL;
