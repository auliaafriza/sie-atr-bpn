import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { MoreVert, AccountCircle, Search } from "@material-ui/icons";
import { AiOutlineLogout } from "react-icons/ai";
// import PropTypes from "prop-types";
import styles from "./styles";
import Logo from "../assets/img/fav.png";
import { resetWhoami, getWhoami, setUsername } from "../actions/globalActions";
import queryString from "query-string";
import moment from "moment";
import Cookies from "universal-cookie";
import { isMobile } from "react-device-detect";

const Header = (props) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const parsed = queryString.parse(location.search);
  // const [open, setOpen] = React.useState(false);
  const userNameRed = useSelector((state) => state.globalReducer.whoAmI);
  const statusRed = useSelector((state) => state.globalReducer.status);
  const userName = parsed ? parsed.u : null;
  const user = useSelector((state) => state.globalReducer.user);
  const [userNm, setUserNm] = useState("");
  const dispatch = useDispatch();
  let userExpired = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;
  let dateExpired = localStorage.getItem("date")
    ? localStorage.getItem("date")
    : null;
  const isMenuOpen = Boolean(anchorEl);
  const cookies = new Cookies();
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getWhoami());
  }, []);

  useEffect(() => {
    let dateTime = moment(new Date()).format("DD/MM/YYYY");
    if (statusRed == "success") {
      dispatch(resetWhoami());
      localStorage.setItem("user", userNameRed);
      localStorage.setItem("date", dateTime);
      setUserNm(userNameRed);
      userNameRed
        ? null
        : window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
    } else if (statusRed == "failed") {
      dispatch(resetWhoami());
      window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
    }
    // let dateTime = moment(new Date()).format("DD/MM/YYYY");
    // if (userName) {
    //   localStorage.setItem("user", userName);
    //   localStorage.setItem("date", dateTime);
    //   setUserNm(userName);
    // } else if (dateTime <= dateExpired) {
    //   setUserNm(userExpired);
    // } else {
    //   window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
    // }
  }, [statusRed]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" className={classes.header}>
      {isMobile ? (
        <Toolbar>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="row">
                <img src={Logo} style={{ width: 35, height: 35 }}></img>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ marginLeft: 10, color: "white", marginTop: 5 }}
                >
                  SIE ATR BPN
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              container
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <IconButton
                edge="end"
                color="inherit"
                href="https://sie.atrbpn.go.id/Auth/Login"
              >
                <AiOutlineLogout />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      ) : (
        <Toolbar>
          <img src={Logo} style={{ width: 35, height: 35 }}></img>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{ marginLeft: 10, color: "white" }}
          >
            SIE ATR BPN
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.search} style={{ marginRight: "40px" }}>
              {/* <div className={classes.searchIcon}>
              <Search />
            </div> */}
              {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
            </div>
            <Typography
              variant="h6"
              style={{
                fontSize: "16px",
                marginTop: "10px",
                margin: "10px",
                color: "white",
              }}
            >
              {userNm}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              href="https://sie.atrbpn.go.id/Auth/Login"
            >
              <AiOutlineLogout />
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreVert />
          </IconButton>
        </div> */}
        </Toolbar>
      )}
      <div
        style={{
          borderTop: "0.5px solid #fff ",
        }}
      />
      {renderMenu}
    </AppBar>
  );
};

export default Header;
