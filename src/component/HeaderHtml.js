import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
  Tab,
  Tabs,
  withStyles,
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
import PropTypes from "prop-types";
import { MENU_LIST } from "../config/menu";
import _ from "lodash";
import { useHistory } from "react-router";
import { url } from "../api/apiClient";
import { StickyContainer, Sticky } from "react-sticky";

import axios from "axios";

const StyledTabs = withStyles({
  root: {
    minWidth: 100,
    fontSize: 12,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  },
})(Tab);

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

const Header = (props) => {
  const classes = styles();
  const parsed = queryString.parse(location.search);
  // const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const dataUser = useSelector((state) => state.globalReducer.whoAmI);
  const statusRed = useSelector((state) => state.globalReducer.status);
  const user = useSelector((state) => state.globalReducer.user);
  const [userNm, setUserNm] = useState("");
  const dispatch = useDispatch();
  let userExpired = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;
  let dateExpired = localStorage.getItem("date")
    ? localStorage.getItem("date")
    : null;
  const cookies = new Cookies();
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
        if (menuFromApi.length === 0) {
          return setMenuList(copy_MENU_LIST);
        } else {
          // const selectedMenu = copy_MENU_LIST.reduce((accMenu, menu, idxMenu) => {
          //   let idxMenuApi = menuFromApi.findIndex(
          //     (e) => e.text.toLowerCase().search(menu.name.toLowerCase()) !== -1
          //   );
          //   if (idxMenu === 0) {
          //     accMenu.push(menu);
          //   } else if (idxMenuApi !== -1) {
          //     menu.subMenus = menu.subMenus.reduce((accSubMenu, subMenu) => {
          //       let idxSubMenuApi = menuFromApi[
          //         idxMenuApi
          //       ]?.listSubMenu.findIndex(
          //         (e) =>
          //           e.text.toLowerCase().search(subMenu.name.toLowerCase()) !== -1
          //       );
          //       if (idxSubMenuApi !== -1) {
          //         accSubMenu.push(subMenu);
          //       }
          //       return accSubMenu;
          //     }, []);
          //     accMenu.push(menu);
          //   }
          //   return accMenu;
          // }, []);
          let selectedMenu = [];
          menuFromApi && menuFromApi.length != 0
            ? menuFromApi.map((menu, index) => {
                let dataMenu = {
                  name: "",
                  icon: "",
                  parentLink: "/404",
                  id: "",
                  subMenus: [],
                };
                let submenuItem = {
                  icon: "",
                  link: "/404",
                  name: "",
                };
                let menuName =
                  menu.text == "Program Strategis Nasional (PSN)"
                    ? "PSN"
                    : menu.text;
                let idxMenuApi = copy_MENU_LIST.findIndex(
                  (e) =>
                    e.name.toLowerCase().search(menuName.toLowerCase()) !== -1
                );
                index == 0 ? selectedMenu.push(copy_MENU_LIST[0]) : null;
                if (idxMenuApi !== -1) {
                  dataMenu.icon = copy_MENU_LIST[idxMenuApi].icon;
                  dataMenu.parentLink = copy_MENU_LIST[idxMenuApi].parentLink;
                  dataMenu.id = copy_MENU_LIST[idxMenuApi].id;
                  dataMenu.name =
                    copy_MENU_LIST[idxMenuApi].name == "PSN"
                      ? menu.text
                      : copy_MENU_LIST[idxMenuApi].name;
                  menu.listSubMenu && menu.listSubMenu.length != 0
                    ? menu.listSubMenu.map((item, index) => {
                        let idxSubMenuApi = copy_MENU_LIST[
                          idxMenuApi
                        ]?.subMenus.findIndex(
                          (e) =>
                            e.name
                              .toLowerCase()
                              .search(item.text.toLowerCase()) !== -1
                        );
                        if (idxSubMenuApi !== -1) {
                          dataMenu.subMenus.push(
                            copy_MENU_LIST[idxMenuApi]?.subMenus[idxSubMenuApi]
                          );
                        } else {
                          submenuItem.name = item.text;
                          submenuItem.link = `/${menu.text}/${item.text}`;
                          dataMenu.subMenus.push(submenuItem);
                        }
                      })
                    : null;
                  selectedMenu.push(dataMenu);
                } else {
                  dataMenu.name = menu.text;
                  dataMenu.link = `/${menu.text}`;
                  dataMenu.parentLink = `/${menu.text}`;
                  dataMenu.id = menu.id;
                  menu.listSubMenu && menu.listSubMenu.length != 0
                    ? menu.listSubMenu.map((item, index) => {
                        submenuItem.name = item.text;
                        submenuItem.link = `/${menu.text}/${item.text}`;
                        dataMenu.subMenus.push(submenuItem);
                      })
                    : null;
                  selectedMenu.push(dataMenu);
                }
              })
            : null;
          console.log(selectedMenu, "selectedMenu");
          return setMenuList(selectedMenu);
        }
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getWhoami());
  }, []);

  useEffect(() => {
    let dateTime = moment(new Date()).format("DD/MM/YYYY HH:mm");
    if (statusRed == "success") {
      dispatch(resetWhoami());
      let expired =
        dataUser && dataUser.expiredDate
          ? moment(new Date(dataUser.expiredDate)).format("DD/MM/YYYY HH:mm")
          : null;
      localStorage.setItem("user", dataUser ? dataUser.nama : "");
      localStorage.setItem("date", expired);
      setUserNm(dataUser.nama);
      dataUser.nama
        ? dataUser.nama == "-" && dateTime <= dateExpired
          ? setUserNm(userExpired)
          : null
        : window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
    } else if (statusRed == "failed") {
      if (dateExpired && dateTime <= dateExpired) {
        dispatch(resetWhoami());
        setUserNm(userExpired);
      } else if (count >= 3) {
        dispatch(resetWhoami());
        window.location.replace("https://sie.atrbpn.go.id/Auth/Login");
      } else {
        dispatch(getWhoami());
        setCount(count + 1);
      }
    }
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

  return (
    <div>
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
                  onClick={() => {
                    localStorage.setItem("user", "");
                    localStorage.setItem("date", null);
                  }}
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
      </AppBar>
      <StickyContainer style={{ height: "100%" }}>
        <Sticky>
          {({ style }) => (
            <AppBar
              className={classes.header}
              color="primary"
              position="sticky"
              elevation={0}
              component="nav"
              variant="dense"
            >
              <Tabs
                value={value}
                textColor="inherit"
                onChange={handleChange}
                indicatorColor="transparent"
                centered
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
                style={{ minWidth: 100, fontSize: 12 }}
              >
                {menuList.map((menu) => (
                  <>
                    <StyledTabs
                      textColor="inherit"
                      icon={menu.icon}
                      label={menu.name}
                      onClick={(event) =>
                        menu.link
                          ? handleChangePage(menu.link)
                          : handleOpenSubMenu(event)
                      }
                      {...a11yProps(menu.id)}
                      selected={
                        location.pathname.search(menu.parentLink) !== -1
                      }
                    />
                    {menu.subMenus && (
                      <Menu
                        id={id}
                        anchorEl={anchorEl}
                        keepMounted
                        open={id === a11yProps(menu.id).id}
                        onClose={handleCloseSubMenu}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
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
                            <span style={{ marginLeft: 10 }}>
                              {subMenu.name}
                            </span>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </>
                ))}
              </Tabs>
            </AppBar>
          )}
        </Sticky>
      </StickyContainer>
    </div>
  );
};

export default Header;
