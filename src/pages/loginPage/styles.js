import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "100%",
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(2, 0),
    },
  },
  form: {
    maxWidth: "330px",
    margin: "0 auto",
    display: flex,
    flexDirection: column,
    background: "rgba(255,255,255,0.5)",
    padding: "20px",
    marginTop: "30px",
  },
  icon: {
    color: "#6b6f82!important",
  },
}));
export default styles;
