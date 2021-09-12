import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { MoreVert, AccountCircle, Search } from "@material-ui/icons";
import { AiOutlineLogout } from "react-icons/ai";
// import PropTypes from "prop-types";
import styles from "./styles";
import Logo from "../assets/img/fav.png";

const Header = (props) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  const userName = useSelector((state) => state.globalReducer.whoAmI);

  // let userName = localStorage.getItem("usernameSie");
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

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <img src={Logo} style={{ width: 35, height: 35 }}></img>
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          style={{ marginLeft: 10 }}
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
            style={{ fontSize: "16px", marginTop: "10px", margin: "10px" }}
          >
            {userName}
          </Typography>
          <IconButton edge="end" color="inherit" href="/Login">
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
