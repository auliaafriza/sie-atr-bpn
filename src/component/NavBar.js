import React, { useEffect } from "react";
import { AppBar, MenuItem, Tab, Tabs, Menu } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles";
import { MENU_LIST } from "../config/menu";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { url } from "../api/apiClient";
import { isMobile } from "react-device-detect";

import axios from "axios";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const NavBar = (props) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState("");
  const [menuList, setMenuList] = React.useState([]);

  useEffect(() => {
    getListMenu();
  }, []);

  // ============= NOTE ===========================
  // JIKA BELOM INTEGRASI DENGAN SSO
  // untuk set username melalui localstorage
  // buka inspec element -> application -> localstorage
  // add new. isi key dengan usernameSie dan value sesuai keinginan.
  // refresh halaman

  const userName = useSelector((state) => state.globalReducer.whoAmI);

  const getListMenu = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios({
      method: "post",
      url: `${url}ApiMenu/ByUsername`,
      data: {
        u: userName, //agung13
      },
    })
      .then(function (response) {
        const menuFromApi = _.get(response, "data.data", []) || [];
        const copy_MENU_LIST = _.clone(MENU_LIST);
        if (menuFromApi.length === 0) return setMenuList(copy_MENU_LIST);
        const selectedMenu = copy_MENU_LIST.reduce((accMenu, menu, idxMenu) => {
          let idxMenuApi = menuFromApi.findIndex(
            (e) => e.text.toLowerCase().search(menu.name.toLowerCase()) !== -1
          );
          if (idxMenu === 0) {
            accMenu.push(menu);
          } else if (idxMenuApi !== -1) {
            menu.subMenus = menu.subMenus.reduce((accSubMenu, subMenu) => {
              let idxSubMenuApi = menuFromApi[
                idxMenuApi
              ]?.listSubMenu.findIndex(
                (e) =>
                  e.text.toLowerCase().search(subMenu.name.toLowerCase()) !== -1
              );
              if (idxSubMenuApi !== -1) {
                accSubMenu.push(subMenu);
              }
              return accSubMenu;
            }, []);
            accMenu.push(menu);
          }
          return accMenu;
        }, []);
        // console.log({ menuFromApi, selectedMenu });
        return setMenuList(selectedMenu);
      })
      .catch(function (error) {
        // handle error
        setMenuList(MENU_LIST);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index, open) => {
    return {
      id: `simple-menu-${index}`,
      "aria-controls": `simple-menu-${index}`,
      "aria-haspopup": "true",
    };
  };

  const history = useHistory();
  const handleChangePage = (link) => {
    history.push(link);
  };

  const handleOpenSubMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setId(event.currentTarget.id);
  };
  const handleCloseSubMenu = () => {
    setAnchorEl(null);
    setId(null);
  };
  return (
    <div>
      {/* <div
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
      </div> */}
      <AppBar
        component="div"
        className={classes.header}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={value}
          textColor="inherit"
          onChange={handleChange}
          indicatorColor="transparent"
          centered
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
        >
          {menuList.map((menu) => (
            <>
              <Tab
                textColor="inherit"
                icon={menu.icon}
                label={menu.name}
                onClick={(event) =>
                  menu.link
                    ? handleChangePage(menu.link)
                    : handleOpenSubMenu(event)
                }
                {...a11yProps(menu.id)}
                selected={location.pathname.search(menu.parentLink) !== -1}
              />
              {menu.subMenus && (
                <Menu
                  id={id}
                  anchorEl={anchorEl}
                  keepMounted
                  open={id === a11yProps(menu.id).id}
                  onClose={handleCloseSubMenu}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  {menu.subMenus.map((subMenu, idx) => (
                    <MenuItem
                      onClick={() => {
                        subMenu.link && handleChangePage(subMenu.link);
                        handleCloseSubMenu();
                      }}
                      key={idx}
                    >
                      {subMenu.icon}
                      <span style={{ marginLeft: 10 }}>{subMenu.name}</span>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </>
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default NavBar;
