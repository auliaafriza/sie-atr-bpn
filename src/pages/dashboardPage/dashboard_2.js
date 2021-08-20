import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import bgImg from "../../assets/img/bg-content.jpg";
import Divider from "@material-ui/core/Divider";
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

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "100vh",
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
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} gutterBottom>
                    Jumlah tanah yang telah di-Sertifikatkan
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: "1.51rem", fontWeight: "bold" }}
                  >
                    3.294.681
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} gutterBottom>
                    Bidang tanah merupakan hasil redistribusi tanah
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: "1.51rem", fontWeight: "bold" }}
                  >
                    290.770
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} gutterBottom>
                    Tanah telah diukur dan dipetakan
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: "1.51rem", fontWeight: "bold" }}
                  >
                    813.028
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} gutterBottom>
                    Transaksi Hak Tanggungan Elektronik telah tercatat dengan
                    nilai sebesar Rp. 1.011 Triliun
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: "1.51rem", fontWeight: "bold" }}
                  >
                    493.108
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} gutterBottom>
                    Telah terintegrasi dengan pemerintah daerah dan Dirjen Pajak
                    untuk validasi pajak dan BPHTB secara online
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: "1.51rem", fontWeight: "bold" }}
                  >
                    361
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                style={{
                  fontSize: "1.51rem",
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
                <Grid item xs={2}>
                  <Typography className={classes.title} gutterBottom>
                    18.481
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    PPAT
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>
                  <Typography className={classes.title} gutterBottom>
                    5.097
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    Surveyor Berlisensi
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>
                  <Typography className={classes.title} gutterBottom>
                    135
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    Appraisal
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>
                  <Typography className={classes.title} gutterBottom>
                    2.966
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    Jasa Keuangan
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3}>
                  <Typography className={classes.title} gutterBottom>
                    29
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    Lembaga Pemerintah Pusat
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                style={{
                  fontSize: "1.51rem",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                About this data
              </Typography>
              <Typography style={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
