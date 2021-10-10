import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import bgImg from "../../assets/img/notFound2.png";
import Divider from "@material-ui/core/Divider";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";

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
        alignContent: "flex-start",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <Grid xs={12} style={{ paddingTop: 180, paddingRight: 150 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <FcSearch size={64} />
          <Typography style={{ fontSize: 72 }}>404</Typography>
        </Grid>
        <Typography
          className={classes.title}
          gutterBottom
          style={{ fontSize: 36 }}
        >
          ------------------------------------------------
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          style={{ fontSize: 36 }}
        >
          Oops!!!
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          style={{ fontSize: 36 }}
        >
          Halaman Tidak Ditemukan
        </Typography>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            style={{ height: 50, width: 200, fontSize: 12 }}
          >
            Dashboard
          </Button>
        </Link>
      </Grid>
    </div>
  );
}
