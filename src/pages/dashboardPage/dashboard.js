import React from 'react';
import PropTypes from 'prop-types';
import ElevationScroll from './ElevationScroll';
import Header from './Header';
import Footer from './Footer';
import styles from './styles';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default function PrimarySearchAppBar(props) {
  const classes = styles();

  return (
    <div className={classes.grow}>
      <Header />
      <ElevationScroll {...props}>
        <NavBar />
      </ElevationScroll>
      <Footer />
    </div>
  );
}
