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
import Graph from "./graphLanding";

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
  const [dataGrowth, setDataGrowth] = useState([]);

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

  const spliDataMitra = (data) => {
    let res = [];
    data && data.length != 0
      ? data.map((item) =>
          item.label.indexOf("Menjalin Kemitraan Dengan") > -1
            ? null
            : res.push(item)
        )
      : null;

    return res;
  };

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}api/Dashboard/get_dashboard`)
      .then(function (response) {
        setData(response.data.data);
        // setData(spliDataMitra(response.data.data));
        // let dataTemp = groupBymitra(response.data.data);
        // setDataMitra(dataTemp);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(`${url}api/Dashboard/get_growth`)
      .then(function (response) {
        setDataGrowth(response.data.data);
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
                          <FiMap size={isMobile ? 28 : 36} />{" "}
                          {data && data.sertipikat_telah_terbit
                            ? data.sertipikat_telah_terbit.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data && data.sertipikat_telah_terbit
                            ? data && data.sertipikat_telah_terbit.satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.sertipikat_telah_terbit
                            ? data.sertipikat_telah_terbit.label
                            : "Sertipikat yang telah terbit"}
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
                          {data && data.jumlah_bidang_tanah
                            ? data.jumlah_bidang_tanah.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data && data.jumlah_bidang_tanah
                            ? data && data.jumlah_bidang_tanah.satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.jumlah_bidang_tanah
                            ? data.jumlah_bidang_tanah.label
                            : "Jumlah bidang tanah hasil retribusi tanah"}
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
                          {data && data.tanah_telah_diukur
                            ? data.tanah_telah_diukur.value
                            : 0}{" "}
                          {data && data.tanah_telah_diukur
                            ? data.tanah_telah_diukur.satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.tanah_telah_diukur
                            ? data.tanah_telah_diukur.label
                            : "Tanah telah diukur dan dipetakan dari total tanah yang terbit"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.3s">
              <div
                class="card pull-up bg-transparent shadow-none"
                style={{
                  borderWidth: 0,
                  marginTop: 15,
                  marginLeft: 100,
                }}
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
                          Grafik Pertumbuhan Penerbitan Sertifikat
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 pl-20 mb-10">
                    <Graph />
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
                          {data &&
                          data.nilai_hak_tanggungan_elektronik_telah_tercatat
                            ? data.nilai_hak_tanggungan_elektronik_telah_tercatat.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}{" "}
                          {data &&
                          data.nilai_hak_tanggungan_elektronik_telah_tercatat
                            ? data
                                .nilai_hak_tanggungan_elektronik_telah_tercatat
                                .satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data &&
                          data.nilai_hak_tanggungan_elektronik_telah_tercatat
                            ? data
                                .nilai_hak_tanggungan_elektronik_telah_tercatat
                                .label
                            : "Nilai hak tanggungan elektronik telah tercatat"}
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
                          {data &&
                          data.pemerintah_daerah_dirjen_pajak_telah_terintegrasi
                            ? data.pemerintah_daerah_dirjen_pajak_telah_terintegrasi.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data &&
                          data.pemerintah_daerah_dirjen_pajak_telah_terintegrasi
                            ? data
                                .pemerintah_daerah_dirjen_pajak_telah_terintegrasi
                                .satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data &&
                          data.pemerintah_daerah_dirjen_pajak_telah_terintegrasi
                            ? data
                                .pemerintah_daerah_dirjen_pajak_telah_terintegrasi
                                .label
                            : "Pemerintah daerah dan Dirjen Pajak yang telah terintegrasi untuk validasi pajak dan BPHTB secara online"}
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
                      marginBottom: 20,
                    }}
                  >
                    - Menjalin Kemitraan Dengan -
                  </h3>
                  <div class="row" style={{ marginBottom: 20 }}>
                    <div
                      class={
                        "col-lg-4 col-md-6 col-sm-12 card-gradient-md-border border-right-white border-right-lighten-3"
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
                          {data && data.jasa_keuangan
                            ? data.jasa_keuangan.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data && data.jasa_keuangan
                            ? data.jasa_keuangan.satuan
                            : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.jasa_keuangan
                            ? data.jasa_keuangan.label
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div
                      class={
                        "col-lg-4 col-md-6 col-sm-12 card-gradient-md-border border-right-white border-right-lighten-3"
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
                          {data && data.ppat
                            ? data.ppat.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data && data.ppat ? data.ppat.satuan : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.ppat ? data.ppat.label : ""}
                        </span>
                      </div>
                    </div>
                    <div class={"col-lg-3 col-md-6 col-sm-12"}>
                      <div class="card-body text-center">
                        <h1
                          class="white"
                          style={{
                            fontSize: 28,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.surveyor
                            ? data.surveyor.value
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                          {data && data.surveyor ? data.surveyor.satuan : ""}
                        </h1>
                        <span
                          class="white"
                          style={{
                            fontSize: 14,
                            textShadow: "1px 2px 2px #000",
                            fontFamily: "Open Sans",
                          }}
                        >
                          {data && data.surveyor ? data.surveyor.label : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="row">
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
                    - Growth pertumbuhan sertipikat terbit -
                  </h3>
                  <div class="row">
                    {dataGrowth && dataGrowth.length != 0
                      ? dataGrowth.map((item, index) => {
                          return (
                            <div
                              class={
                                index != dataGrowth.length - 1
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
                                  {item.growth}
                                </h1>
                                <span
                                  class="white"
                                  style={{
                                    fontSize: 14,
                                    textShadow: "1px 2px 2px #000",
                                    fontFamily: "Open Sans",
                                  }}
                                >
                                  Tahun {item.tahunterbit}
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
