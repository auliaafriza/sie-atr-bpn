import React from "react";
import {
  AppBar,
  MenuItem,
  Tab,
  Tabs,
  // Popover,
  Menu,
  // Popper,
  // Grow,
  // Paper,
  // MenuList,
  // ClickAwayListener,
  // Fade,
} from "@material-ui/core";
// import { Home, SupervisorAccount, Public } from "@material-ui/icons";
// import { BiMoney, BiLineChart, BiBriefcase } from "react-icons/bi";
// import { FaCertificate, FaHandshake } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./styles";
// import { Button } from "react-bootstrap";
import { MENU_LIST } from "../config/menu";
import _ from "lodash";
import { useHistory } from "react-router";
// import DashHome from "./Home";
// import CenteredGrid from "./dashboard_2";

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
  // const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index, open) => {
    return {
      // id: `simple-tab-${index}`,
      // "aria-controls": `simple-tabpanel-${index}`,
      id: `simple-menu-${index}`,
      "aria-controls": `simple-menu-${index}`,
      "aria-haspopup": "true",
    };
  };

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   // handleMobileMenuClose();
  // };
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
        {/* <Button
          id="simple-menu-1"
          aria-controls="simple-menu-1"
          aria-haspopup="true"
          onClick={handleOpenSubMenu}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu-1"
          anchorEl={anchorEl}
          keepMounted
          open={id === "simple-menu-1"}
          onClose={handleCloseSubMenu}
        >
          <MenuItem onClick={handleCloseSubMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseSubMenu}>My account</MenuItem>
          <MenuItem onClick={handleCloseSubMenu}>Logout</MenuItem>
        </Menu>
        <Button
          id="simple-menu-2"
          aria-controls="simple-menu-2"
          aria-haspopup="true"
          onClick={handleOpenSubMenu}
        >
          Open Menu 2
        </Button>
        <Menu
          id="simple-menu-2"
          anchorEl={anchorEl}
          keepMounted
          open={id === "simple-menu-2"}
          onClose={handleCloseSubMenu}
        >
          <MenuItem onClick={handleCloseSubMenu}>Profile2</MenuItem>
          <MenuItem onClick={handleCloseSubMenu}>My account2</MenuItem>
          <MenuItem onClick={handleCloseSubMenu}>Logout2</MenuItem>
        </Menu> */}
        <Tabs
          value={value}
          textColor="inherit"
          onChange={handleChange}
          indicatorColor="transparent"
          centered
        >
          {MENU_LIST.map((menu) => (
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
                      {subMenu.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </>
          ))}

          {/* <Tab
            textColor="inherit"
            icon={<BiMoney size={24} />}
            label="Aset & Keuangan"
            onClick={handleOpenSubMenu}
            {...a11yProps(1)}
          /> */}
          {/* <Tab
            textColor="inherit"
            icon={<SupervisorAccount />}
            label="Kepegawaian"
            {...a11yProps(2)}
          /> */}
          {/* <Tab
            textColor="inherit"
            icon={<FaHandshake size={24} />}
            label="Mitra"
            {...a11yProps(3)}
          /> */}
          {/* <Tab
            textColor="inherit"
            icon={<BiLineChart size={24} />}
            label="Kinerja Layanan"
          /> */}

          {/* <Tab
            textColor="inherit"
            icon={<BiBriefcase size={24} />}
            label="PSN"
            {...a11yProps(5)}
          /> */}
          {/* <Tab
            textColor="inherit"
            icon={<FaCertificate size={24} />}
            label="Sertifikat"
            {...a11yProps(6)}
          /> */}
          {/* <Tab
            textColor="inherit"
            icon={<Public />}
            label="Info Geo-spasial"
            {...a11yProps(7)}
            onClick={() => setOpen(true)}
          /> */}
        </Tabs>
        {/* <Menu
          id={id}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseSubMenu}
        >
          <MenuItem onClick={handleCloseSubMenu}>PNBP</MenuItem>
          <MenuItem onClick={handleCloseSubMenu}>BPHTB</MenuItem>
        </Menu> */}
        {/* <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={() => setOpen(false)}>Three</MenuItem>
          <MenuItem onClick={() => setOpen(false)}>Four</MenuItem>
          <MenuItem onClick={() => setOpen(false)}>Five</MenuItem>
        </Popover> */}
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        <CenteredGrid />
        <DashHome />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
};

export default NavBar;
