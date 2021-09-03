import React from "react";
import "./index.css";
import Login from "./pages/loginPage/login";
import Dashboard from "./pages/dashboardPage/dashboard";
import Nav from "./pages/dashboardPage/Nav";
import PrintPNBPAnggaranRealisasi from "./pages/pnbp/sie-pnbp-realisasi-anggaran/componentPrint";
import { PengadaanTanah } from "./pages/psn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <div>
      {/* {location.pathname != "/Login" && <Nav />} */}
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/PrintPNBPAnggaranRealisasi">
          <PrintPNBPAnggaranRealisasi />
        </Route>
        <Route path="/PengadaanTanah">
          <PengadaanTanah />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
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
