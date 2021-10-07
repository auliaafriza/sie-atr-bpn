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
import Cookies from "universal-cookie";

const HeaderHtml = (props) => {
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

  const getCookie = (cname) => {
    // let name = cname + "=";
    // let decodedCookie = decodeURIComponent(document.cookie);
    // let ca = decodedCookie.split(";");
    // for (let i = 0; i < ca.length; i++) {
    //   let c = ca[i];
    //   while (c.charAt(0) == " ") {
    //     c = c.substring(1);
    //   }
    //   if (c.indexOf(name) == 0) {
    //     return c.substring(name.length, c.length);
    //   }
    // }
    // return "";
    let value = "";
    value = cookies.get(cname);
    return value;
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // let user = getCookie(".atrbpn2409");
    dispatch(getWhoami());
  }, []);

  useEffect(() => {
    let dateTime = moment(new Date()).format("DD/MM/YYYY");
    if (statusRed == "success") {
      dispatch(resetWhoami());
      localStorage.setItem("user", userNameRed);
      localStorage.setItem("date", dateTime);
      setUserNm(userNameRed);
      // userNameRed
      //   ? null
      //   : window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
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
      <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow navbar-static-top navbar-light navbar-brand-center">
        <div class="navbar-wrapper border-bottom">
          <div class="navbar-header">
            <ul class="nav navbar-nav flex-row float-left">
              <li class="nav-item mobile-menu d-md-none mr-auto flex-row">
                <a class="navbar-brand" href="/Dashboard">
                  <img src={Logo} style={{ width: 35, height: 35 }}></img>
                  <h3 class="brand-text  text-white">SIE ATR BPN</h3>
                </a>
              </li>
            </ul>
            <ul class="nav navbar-nav float-right">
              <li class="dropdown dropdown-user nav-item">
                <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  href="javascript:;"
                  data-toggle="dropdown"
                >
                  <span class="avatar avatar-online">
                    <img
                      src="app-assets/images/portrait/small/avatar-s-19.png"
                      alt="avatar"
                    />
                    <i></i>
                  </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="login.html">
                    <i class="ft-power"></i> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="navbar-container content">
            <div class="collapse navbar-collapse" id="navbar-mobile">
              <ul class="nav navbar-nav mr-auto float-left flex-row">
                <li class="nav-item">
                  <a class="navbar-brand" href="/Dashboard">
                    <img src={Logo} style={{ width: 35, height: 35 }}></img>
                    <h3 class="brand-text  text-white">SIE ATR BPN</h3>
                  </a>
                </li>
              </ul>
              <ul class="nav navbar-nav float-right">
                <li class="dropdown dropdown-user nav-item">
                  <a
                    class="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <span class="mr-1 user-name text-bold-700 text-white">
                      John Doe
                    </span>
                    <span class="avatar avatar-online">
                      <img
                        src="app-assets/images/portrait/small/avatar-s-19.png"
                        alt="avatar"
                      />
                      <i></i>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="login.html">
                      <i class="ft-power"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div
        class="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-dark navbar-without-dd-arrow navbar-shadow"
        role="navigation"
        data-menu="menu-wrapper"
      >
        <div
          class="navbar-container main-menu-content w-100 text-center"
          data-menu="menu-container"
        >
          <ul
            class="nav navbar-nav"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li class="nav-item menu-collapsed-open active">
              <a class="nav-link" href="javascript:;">
                <i class="la la-home"></i>
                <span data-i18n="Dashboard">Dashboard</span>
              </a>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="javascript:;"
                data-toggle="dropdown"
              >
                <i class="la la-money"></i>
                <span data-i18n="Templates">Aset & Keuangan</span>
              </a>
              <ul class="dropdown-menu">
                <li class="" data-menu="">
                  <a
                    class="dropdown-item"
                    href="asetKeu-pnbp.html"
                    data-toggle=""
                  >
                    <i class="la la-cc-paypal"></i>
                    <span data-i18n="PNBP">PNBP</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-bold"></i>
                    <span data-i18n="ToDo">BPHTB</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-users"></i>
                <span data-i18n="Kepegawaian">Kepegawaian</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-users"></i>
                    <span data-i18n="ToDo">Pegawai ATR/BPN</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-industry"></i>
                    <span data-i18n="Contacts">Organisasi</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-share-alt"></i>
                <span data-i18n="Pages">Mitra</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-bar-chart"></i>
                    <span data-i18n="Statistik Kemitraan">
                      Statistik Kemitraan
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-area-chart"></i>
                <span data-i18n="Pages">Kinerja Layanan</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-newspaper-o"></i>
                    <span data-i18n="Statistik Kemitraan">IKPA</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-share-alt"></i>
                    <span data-i18n="Social Feed">IKK / IKU</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-user-plus"></i>
                    <span data-i18n="Account Setting">Tunggakan</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-building"></i>
                    <span data-i18n="Pricing">Layanan Umum</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-briefcase"></i>
                <span data-i18n="Pages">PSN</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-newspaper-o"></i>
                    <span data-i18n="Statistik Kemitraan">
                      Percepatan Rencana Detail Tata Ruang
                    </span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-industry"></i>
                    <span data-i18n="Social Feed">
                      Pendaftaran Tanah Sistematis Lengkap
                    </span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-tablet"></i>
                    <span data-i18n="Account Setting">Reforma Agraria</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-share-alt"></i>
                    <span data-i18n="Pricing">Pengadaan Tanah</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-slack"></i>
                    <span data-i18n="Checkout">
                      Transformasi Digital & Layanan Elektronik
                    </span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-bar-chart"></i>
                    <span data-i18n="FAQ">
                      Pengendalian dan Penanganan Sengketa
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-certificate"></i>
                <span data-i18n="Pages">Sertifikasi</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-database"></i>
                    <span data-i18n="Knowledge Base">Statistik Sertifikat</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-newspaper-o"></i>
                    <span data-i18n="Statistik Kemitraan">
                      Tanah Aset Pemerintah
                    </span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-industry"></i>
                    <span data-i18n="Social Feed">
                      Hak Tanggungan Elektonik
                    </span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-map-pin"></i>
                    <span data-i18n="Account Setting">
                      Peta Pendaftaran Tanah
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item" data-menu="dropdown">
              <a
                class="dropdown-toggle nav-link"
                href="#"
                data-toggle="dropdown"
              >
                <i class="la la-globe"></i>
                <span data-i18n="Pages">Info Geo-spasial</span>
              </a>
              <ul class="dropdown-menu">
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-share-alt"></i>
                    <span data-i18n="Statistik Kemitraan">Tanah Terlantar</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-dollar"></i>
                    <span data-i18n="Social Feed">Nilai Tanah</span>
                  </a>
                </li>
                <li data-menu="">
                  <a class="dropdown-item" href="" data-toggle="">
                    <i class="la la-map"></i>
                    <span data-i18n="Account Setting">Peta Lainnya</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </AppBar>
  );
};

export default HeaderHtml;
