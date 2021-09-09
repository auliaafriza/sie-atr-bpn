import React from "react";
import SiePsnPtsl5Peringkat from "./sie_psn_ptsl_5peringkat";
import RealisasiPerkegiatan from "./sie_ptsl_realisasi_perkegiatan";
import bgImg from "../../../assets/img/psn.jpg";

const PTSL = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <SiePsnPtsl5Peringkat />
      <RealisasiPerkegiatan />
    </div>
  );
};

export default PTSL;
