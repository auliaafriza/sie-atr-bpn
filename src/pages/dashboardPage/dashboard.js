import React from "react";
import styles from "./styles";

import DashHome from "./Home";
import CenteredGrid from "./dashboard_2";
export default function PrimarySearchAppBar(props) {
  const classes = styles();

  return (
    <>
      <CenteredGrid />
      <DashHome />
    </>
  );
}
