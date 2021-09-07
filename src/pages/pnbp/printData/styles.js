import { alpha, makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  header: {
    background:
      "linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(20, 27, 46) 34%, rgb(0, 62, 105) 100%)",
  },
  footer: {
    display: "block",
    padding: "10px",
    height: "30px",
    width: "100%",

    // position: 'fixed',
    // bottom: 0,
  },
  footerStyle: {
    background:
      "linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(20, 27, 46) 34%, rgb(0, 62, 105) 100%)",
    fontSize: "14px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "left",
    padding: "10px",
    paddingLeft: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "30px",
    width: "100%",
  },
  titleSection: {
    margin: 10,
    lineHeight: "1.2rem",
    letterSpacing: 1,
    color: "#464855",
    fontSize: 28,
  },
  isiTextStyle: {
    margin: 10,
    letterSpacing: 1,
    color: "#6b6f82",
    fontSize: 12,
    fontWeight: "600",
  },
  isiContentTextStyle: {
    margin: 10,
    letterSpacing: 1,
    color: "#6b6f82",
    fontSize: 16,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectStyle: {
    height: 57,
    marginRight: 5,
    fontSize: 14,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "93%",
    padding: 20,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
    borderWidth: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  },
  rootOdd: {
    width: "90%",
    margin: 20,
    marginRight: 0,
    paddingTop: 20,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
    borderWidth: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  },
  buttonGroupStyle: {
    border: "1px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "20px",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0px 0px #ffffff, 0 0px 0px #ffffff!important",
  },
  barChart: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
    borderWidth: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    padding: theme.spacing(2, 4, 3),
  },
  tooltipCustom: {
    backgroundColor: "white",
    padding: 10,
    border: "2px solid rgba(0, 0, 0, 0.06)",
    borderWidth: 2,
  },
  table: {
    minWidth: 700,
  },
  modalStyle1: {
    position: "absolute",
    overflow: "scroll",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",
  },
  modalCover: {
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
    borderWidth: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    padding: theme.spacing(2, 4, 3),
  },
  barChartModal: {
    width: "80%",
    justifyContent: "center",
  },
  rootList: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
  },
  inline: {
    display: "inline",
  },
}));
export default styles;
