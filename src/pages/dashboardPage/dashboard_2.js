import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import bgImg from "../../assets/img/bg-content.jpg";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { url } from "../../api/apiClient";
import { isMobile } from "react-device-detect";

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
        // height: "100vh",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        alignContent: "center",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{
          padding: "3em",
        }}
      >
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ paddingTop: 25 }}
              >
                <Grid
                  item
                  xs={8}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    className={classes.title}
                    gutterBottom
                    style={{ fontSize: isMobile ? 9 : 20 }}
                  >
                    Jumlah tanah yang telah di Sertifikatkan pada tahun 2000
                    hingga sekarang
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    style={{
                      fontSize: isMobile ? 12 : "1.51rem",
                      fontWeight: "bold",
                    }}
                  >
                    {data && data.length != 0
                      ? data[0].value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ paddingTop: 20 }}
              >
                <Grid item xs={4}>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    style={{
                      fontSize: isMobile ? 9 : "1.51rem",
                    }}
                  >
                    Bidang tanah hasil redistribusi tanah pada tahun 2000 hingga
                    sekarang
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{
                      fontSize: isMobile ? 12 : "1.51rem",
                      fontWeight: "bold",
                    }}
                  >
                    {data && data.length != 0
                      ? data[1].value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ paddingTop: 20 }}
              >
                <Grid item xs={4}>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    style={{
                      fontSize: isMobile ? 9 : "1.51rem",
                    }}
                  >
                    Tanah telah diukur dan dipetakan pada tahun 2000 hingga
                    sekarang
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{
                      fontSize: isMobile ? 12 : "1.51rem",
                      fontWeight: "bold",
                    }}
                  >
                    {data && data.length != 0
                      ? data[2].value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Card className={classes.root} style={{ marginTop: 30 }}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    style={{
                      fontSize: isMobile ? 9 : "1.51rem",
                    }}
                  >
                    Nilai Hak Tanggungan Elektronik telah tercatat pada tahun
                    2000 hingga sekarang sebesar
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      fontSize: isMobile ? 12 : "1.51rem",
                      fontWeight: "bold",
                    }}
                  >
                    Rp{" "}
                    {data && data.length != 0
                      ? data[3].value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : 0}{" "}
                    Triliun
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Card className={classes.root} style={{ marginTop: 30 }}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    style={{
                      fontSize: isMobile ? 9 : "1.51rem",
                    }}
                  >
                    Pemerintah daerah dan Dirjen Pajak yang telah terintegrasi
                    untuk validasi pajak dan BPHTB secara online pada tahun 2000
                    hingga sekarang
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      fontSize: isMobile ? 12 : "1.51rem",
                      fontWeight: "bold",
                    }}
                  >
                    {data && data.length != 0
                      ? data[4].value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 30 }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                style={{
                  fontSize: isMobile ? 12 : "1.51rem",
                  fontWeight: "bold",
                  marginBottom: "1em",
                }}
              >
                - Menjalin Kemitraan Dengan -
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {dataMitra && dataMitra.length != 0
                  ? dataMitra.map((item, index) => {
                      return (
                        <>
                          <Grid item xs={isMobile ? 12 : 2}>
                            <Typography
                              className={classes.title}
                              gutterBottom
                              style={{
                                fontSize: isMobile ? 12 : "1",
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
                            </Typography>
                            <Typography
                              className={classes.title}
                              gutterBottom
                              style={{
                                fontSize: isMobile ? 12 : "1",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Grid>{" "}
                          {index ==
                          dataMitra.length - 1 ? null : isMobile ? null : (
                            <Divider orientation="vertical" flexItem />
                          )}
                        </>
                      );
                    })
                  : null}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
