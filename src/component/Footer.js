import React from "react";
import styles from "../pages/dashboardPage/styles";
import { Typography } from "@material-ui/core";

const Footer = () => {
  const classes = styles();
  return (
    <div>
      <div className={classes.footer} />
      <div className={classes.footerStyle}>
        <Typography variant="title" style={{ color: "#ffffff" }}>
          Copyright © 2021 SIE ATR BPN
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
