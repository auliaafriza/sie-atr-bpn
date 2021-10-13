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
import { FiMap, FiCheckCircle } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";

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
  const [data, setData] = useState([]);
  const [dataMitra, setDataMitra] = useState([]);

  const groupBymitra = (data) => {
    let res = [];
    data.map((item, index) => {
      let label = item.label;
      if (label.indexOf("Menjalin Kemitraan Dengan") > -1) {
        res.push({
          label: label.replace("Menjalin Kemitraan Dengan ", ""),
          value: item.value,
        });
      }
    });
    return res;
  };

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}api/Dashboard/get_dashboard`)
      .then(function (response) {
        setData(response.data.data);
        let dataTemp = groupBymitra(response.data.data);
        setDataMitra(dataTemp);
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
        height: isMobile ? "100%" : "100vh",
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
                          <FiMap size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[0].value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Jumlah tanah yang telah di Sertifikatkan pada tahun
                          2000 hingga sekarang
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
                          <FiMap size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[1].value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Bidang tanah hasil retribusi tanah pada tahun 2000
                          hingga sekarang
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
                          <FiMap size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[2].value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Tanah telah diukur dan dipetakan pada tahun 2000
                          hingga sekarang
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.4s">
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
                            marginTop: isMobile ? 10 : 40,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          <BsListCheck size={isMobile ? 28 : 36} /> Rp{" "}
                          {data && data.length != 0
                            ? data[3].value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}{" "}
                          Triliun
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Nilai hak tanggungan elektronik telah tercatat pada
                          tahun 2000 hingga sekarang
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
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
                            marginTop: isMobile ? 10 : 40,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          <FiCheckCircle size={isMobile ? 28 : 36} />{" "}
                          {data && data.length != 0
                            ? data[4].value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Pemerintah daerah dan Dirjen Pajak yang telah
                          terintegrasi untuk validasi pajak dan BPHTB secara
                          online pada tahun 2000 hingga sekarang
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 wow fadeInUp">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{ borderWidth: 0 }}
              >
                <div class="card-content">
                  <h3
                    class="text-center p-1 mb-20 white"
                    style={{
                      fontSize: 26,
                      marginTop: isMobile ? 10 : 40,
                      fontWeight: "bold",
                      textShadow: "1px 2px 2px #000",
                      fontFamily: "Open Sans",
                    }}
                  >
                    - Menjalin Kemitraan Dengan -
                  </h3>
                  <div class="row">
                    {dataMitra && dataMitra.length != 0
                      ? dataMitra.map((item, index) => {
                          return (
                            <div
                              class={
                                index != dataMitra.length - 1
                                  ? "col-lg-4 col-md-6 col-sm-12 card-gradient-md-border border-right-white border-right-lighten-3"
                                  : "col-lg-3 col-md-6 col-sm-12"
                              }
                            >
                              <div class="card-body text-center">
                                <h1
                                  class="white"
                                  style={{
                                    fontSize: 28,
                                    textShadow: "1px 2px 2px #000",
                                    fontFamily: "Open Sans",
                                  }}
                                >
                                  {item.value
                                    ? item.value
                                        .toString()
                                        .replace(
                                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                          ","
                                        )
                                    : 0}
                                </h1>
                                <span
                                  class="white"
                                  style={{
                                    fontSize: 14,
                                    textShadow: "1px 2px 2px #000",
                                    fontFamily: "Open Sans",
                                  }}
                                >
                                  {item.label}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
