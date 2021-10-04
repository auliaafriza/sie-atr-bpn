import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
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

const Header = (props) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const parsed = queryString.parse(location.search);
  // const [open, setOpen] = React.useState(false);
  const userNameRed = useSelector((state) => state.globalReducer.whoAmI);
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
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    let user = getCookie(".atrbpn2409");
    dispatch(getWhoami(user));
  }, []);

  useEffect(() => {
    let dateTime = moment(new Date()).format("DD/MM/YYYY");
    if (status == "success") {
      dispatch(resetWhoami());
      localStorage.setItem("user", userNameRed);
      localStorage.setItem("date", dateTime);
      setUserNm(userNameRed);
      userNameRed
        ? null
        : window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
    } else if (status == "failed") {
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
  }, []);

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
            {userNm || userExpired}
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
