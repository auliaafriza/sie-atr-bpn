import React from "react";
import PSNRa from "./sie_psn_ra";
import bgImg from "../../../assets/img/psn.jpg";

const PTSL = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        height: "75vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <PSNRa />
    </div>
  );
};

export default PTSL;
