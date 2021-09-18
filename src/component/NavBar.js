import React, { useEffect } from "react";
import { AppBar, MenuItem, Tab, Tabs, Menu } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles";
import { MENU_LIST } from "../config/menu";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { url } from "../api/apiClient";

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
          if (idxMenu === 0 || idxMenu === 6) {
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
