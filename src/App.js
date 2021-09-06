import React from "react";
import "./index.css";
import Login from "./pages/loginPage/login";
import Dashboard from "./pages/dashboardPage/dashboard";
import PrintData from "./pages/pnbp/printData/componentPrint";
import { SiePsnLuasPengadaanTanah } from "./pages/psn";
import { RealisasiAnggaran, PaguMp } from "./pages/pnbp";
import {
  StatistikSertifikat,
  HakTanggunganElektronik,
} from "./pages/sertifikasi";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
// ****** untuk menu *******
import Header from "./component/Header";
import ElevationScroll from "./component/ElevationScroll";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { HIDE_HEADER, HIDE_FOOTER } from "./config/menu";
// ****** untuk menu *******

const Main = withRouter(({ location }) => {
  const noNavbar = HIDE_HEADER.find((e) => e === location.pathname);
  const noFooter = HIDE_FOOTER.find((e) => e === location.pathname);
  return (
    <div>
      {/* ******************* MENU ******************* */}
      {!noNavbar && (
        <>
          <Header />
          <ElevationScroll>
            <NavBar />
          </ElevationScroll>
        </>
      )}
      {/* ******************* MENU ******************* */}
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/PrintData">
          <PrintData />
        </Route>
        <Route path="/PSN/PengadaanTanah">
          <SiePsnLuasPengadaanTanah />
        </Route>
        <Route path="/Sertifikasi/StatistikSertifikat">
          <StatistikSertifikat />
        </Route>
        <Route path="/Sertifikasi/HakTanggunganElektronik">
          <HakTanggunganElektronik />
        </Route>
        <Route path="/PNBP/RealisasiAnggaran">
          <RealisasiAnggaran />
        </Route>
        <Route path="/PNBP/PaguMp">
          <PaguMp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
      {!noFooter && <Footer />}
    </div>
  );
});

export default function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}
