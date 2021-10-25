import React, { useEffect } from "react";
import {
  AppBar,
  MenuItem,
  Tab,
  Tabs,
  Menu,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles";
import { MENU_LIST } from "../config/menu";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { url } from "../api/apiClient";
import { isMobile } from "react-device-detect";
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

const NavBar = (props) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState("");
  const [menuList, setMenuList] = React.useState([]);
  const [isScroll, setIsScroll] = React.useState(false);

  useEffect(() => {
    getListMenu();
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        setIsScroll(true);
      } else {
        header.classList.remove("sticky");
        setIsScroll(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
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
                  copy_MENU_LIST[idxMenuApi].link
                    ? (dataMenu.link = copy_MENU_LIST[idxMenuApi].link)
                    : null;
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

  const handleEvent = (event, menu) => {
    if (event.type === "mouseenter") {
      handleOpenSubMenu(event);
    } else if (event.type === "click" && menu) {
      handleChangePage(menu.link);
    }
  };

  return (
    <div>
      <AppBar
        className={classes.header}
        color="primary"
        position={isScroll ? "fixed" : "sticky"}
        elevation={0}
        component="nav"
        variant="dense"
        id="myHeader"
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
                // onClick={(event) => handleEvent(event, menu)}
                // onMouseEnter={(event) => handleEvent(event)}
                onClick={(event) =>
                  menu.link
                    ? handleChangePage(menu.link)
                    : handleOpenSubMenu(event)
                }
                onMouseEnter={(event) => handleOpenSubMenu(event)}
                // onMouseLeave={() => handleCloseSubMenu()}
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
                  // MenuListProps={{ onMouseLeave: handleCloseSubMenu() }}
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
