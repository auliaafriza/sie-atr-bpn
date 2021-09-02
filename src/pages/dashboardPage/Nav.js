import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import {
  MoreVert,
  AccountCircle,
  Search,
  Home,
  SupervisorAccount,
  Public,
} from "@material-ui/icons";
// import PropTypes from "prop-types";
import styles from "./styles";
import Logo from "../../assets/img/fav.png";
import { BiMoney, BiLineChart, BiBriefcase } from "react-icons/bi";
import { FaCertificate, FaHandshake } from "react-icons/fa";

const Nav = () => {
  const classes = styles();
  const [typed, setTyped] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
  const GetData = (e) => {
    setTyped("search/" + e.target.value);
  };
  return (
    <AppBar className={classes.header} position="static">
      <nav>
        <div className="container-fluid">
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
                <div className={classes.searchIcon}>
                  <Search />
                </div>
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
                John Doe
              </Typography>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="white"
              >
                <AccountCircle style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="white"
              >
                <MoreVert />
              </IconButton>
            </div>
          </Toolbar>
          <div
            style={{
              borderTop: "0.5px solid #fff ",
            }}
          />
          {renderMenu}
          {/* <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.rowMenu}
          >
            <NavLink className="active" aria-current="page" to="/Dashboard">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <Home style={{ color: "white" }} />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Dashboard
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/favorite">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <BiMoney size={24} color="white" />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Asset & Keuangan
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watch-later">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <SupervisorAccount style={{ color: "white" }} />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Kepegawaian
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watched">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <FaHandshake size={24} color="white" />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Mitra
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watched">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <BiLineChart size={24} color="white" />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Kinerja Layanan
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watched">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                className={classes.rowMenu}
                alignItems="center"
              >
                <BiBriefcase size={24} color="white" />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  PSN
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watched">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <FaCertificate size={24} color="white" />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Sertifikat
                </Typography>
              </Grid>
            </NavLink>
            <NavLink to="/watched">
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.rowMenu}
              >
                <Public style={{ color: "white" }} />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    margin: "10px",
                    color: "white",
                  }}
                >
                  Info Geo-Spasial
                </Typography>
              </Grid>
            </NavLink> */}

          {/* <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              style={{ color: "gray" }}
            >
              Movie Genres
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  Action
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  Comedy
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  Drama
                </NavLink>
              </li>
            </ul> */}
          {/* </Grid> */}
        </div>
      </nav>
    </AppBar>
  );
};
export default Nav;
