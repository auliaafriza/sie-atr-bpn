import React from "react";
import SiePsnRdtr from "./sie_psn_rdtr";
import bgImg from "../../../assets/img/psn.jpg";

const RTDR = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <SiePsnRdtr />
    </div>
  );
};

export default RTDR;
