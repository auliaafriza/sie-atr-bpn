import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import bgImg from "../../assets/img/bg-content-2.jpg";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { url } from "../../api/apiClient";
import { isMobile } from "react-device-detect";
import { IoPeopleCircleOutline } from "react-icons/io5";
import styles from "./styles";
import GraphEselon from "./graphLanding";
import GraphGolongan from "./graphLandingGol";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "0.35rem",
    padding: "0.3em",
    minHeight: "7em",
    position: "relative",
    top: 0,
    transition: "top ease 0.5s",

    "&:hover": {
      top: "-10px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const classesstyles = styles();
  const [data, setData] = useState([]);
  const [dataEselon, setDataEselon] = useState([
    {
      label: "I",
      jumlah: 10,
    },
    {
      label: "II",
      jumlah: 20,
    },
  ]);

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}Kepegawaian/Pegawai/sie_pegawai_Landing`)
      .then(function (response) {
        setData(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        height: isMobile ? "100%" : "100%",
        width: isMobile ? "100%" : "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        alignContent: "center",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <div class="content-overlay"></div>
      <div class="content-wrapper" style={{ paddingTop: isMobile ? 10 : 70 }}>
        <div class="content-header row"></div>
        <div class="content-body px-md-3">
          <div class="row">
            <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0 }}
              >
                <div class="card-content">
                  <div class="row">
                    <div class="col-12 card-gradient-md-border border-right-lighten-3">
                      <div class="card-body text-center">
                        <h1
                          class="display-4 white"
                          style={{
                            fontSize: isMobile ? 28 : 36,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          <IoPeopleCircleOutline size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[0].jumlah
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 16,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah Pegawai Nasional
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0 }}
              >
                <div class="card-content">
                  <div class="row">
                    <div class="col-12 card-gradient-md-border border-right-lighten-3">
                      <div class="card-body text-center">
                        <h1
                          class="display-4 white"
                          style={{
                            fontSize: isMobile ? 28 : 36,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          <IoPeopleCircleOutline size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[1].jumlah
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 16,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah Pegawai Pensiun Tahun{" "}
                          {new Date().getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0 }}
              >
                <div class="card-content">
                  <div class="row">
                    <div class="col-12 card-gradient-md-border border-right-lighten-3">
                      <div class="card-body text-center">
                        <h1
                          class="display-4 white"
                          style={{
                            fontSize: isMobile ? 28 : 36,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          <IoPeopleCircleOutline size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[2].jumlah
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 16,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah Pegawai Pensiun Tahun{" "}
                          {new Date().getFullYear() + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0, marginTop: 10 }}
              >
                <div class="card-content">
                  <div class="row">
                    <div class="col-12 card-gradient-md-border border-right-lighten-3">
                      <div class="card-body text-center">
                        <h1
                          class="display-4 white"
                          style={{
                            fontSize: 28,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah Pegawai yang Pensiun berdasar Eselon
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <GraphEselon />
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0, marginTop: 10 }}
              >
                <div class="card-content">
                  <div class="row">
                    <div class="col-12 card-gradient-md-border border-right-lighten-3">
                      <div class="card-body text-center">
                        <h1
                          class="display-4 white"
                          style={{
                            fontSize: 28,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah Pegawai yang Pensiun berdasar Golongan
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <GraphGolongan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
