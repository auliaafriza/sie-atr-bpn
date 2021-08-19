import React from "react";
import { AppBar, MenuItem, Tab, Tabs, Popover } from "@material-ui/core";
import { Home, SupervisorAccount, Public } from "@material-ui/icons";
import { BiMoney, BiLineChart, BiBriefcase } from "react-icons/bi";
import { FaCertificate, FaHandshake } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./styles";
import DashHome from "./Home";
import CenteredGrid from "./dashboard_2";

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
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
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

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
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
          <Tab
            textColor="inherit"
            icon={<Home />}
            label="Dashboard"
            {...a11yProps(0)}
          />
          <Tab
            textColor="inherit"
            icon={<BiMoney size={24} />}
            label="Aset & Keuangan"
            {...a11yProps(1)}
          />
          <Tab
            textColor="inherit"
            icon={<SupervisorAccount />}
            label="Kepegawaian"
            {...a11yProps(2)}
          />
          <Tab
            textColor="inherit"
            icon={<FaHandshake size={24} />}
            label="Mitra"
            {...a11yProps(3)}
          />
          <Tab
            textColor="inherit"
            icon={<BiLineChart size={24} />}
            label="Kinerja Layanan"
          />
          <Tab
            textColor="inherit"
            icon={<BiBriefcase size={24} />}
            label="PSN"
            {...a11yProps(4)}
          />
          <Tab
            textColor="inherit"
            icon={<FaCertificate size={24} />}
            label="Sertifikat"
            {...a11yProps(5)}
          />
          <Tab
            textColor="inherit"
            icon={<Public />}
            label="Info Geo-spasial"
            onClick={() => setOpen(true)}
          />
        </Tabs>
        <Popover
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
        </Popover>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CenteredGrid />
        <DashHome />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default NavBar;
