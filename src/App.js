import React from "react";
import "./index.css";
import Login from "./pages/loginPage/login";
import Dashboard from "./pages/dashboardPage/dashboard";
import PrintData from "./pages/pnbp/printData/componentPrint";
import { PTSL, SiePsnLuasPengadaanTanah } from "./pages/psn";
import {
  RealisasiAnggaran,
  PaguMp,
  PnbpPaguMpOpsNon,
  PengembalianPNBP,
  PeringkatRealisasi,
  AlokasiAnggaran,
  PnbpBerkasPeringkatWilayah,
  PnbpBerkasPeringkat,
  PnbpBerkasWilayah,
  RealisasiPenerimaan,
  RealisasiPengunaan,
  RealisasiTargetPenerimaan,
  PnbpPage,
} from "./pages/pnbp";
import {
  BPHTBJumlahBerkas,
  BPHTBJumlahIntegrasi,
  BPHTBPage,
} from "./pages/bphtb";
import {
  KepegawaianBPNGol,
  KepegawaianBPNJK,
  KepegawaianBPNUsia,
  KepegawaianBPNPendidikan,
  KepegawaianBPNJabatan,
  PegawaiAtr,
} from "./pages/kepegawaian";
import {
  StatistikSertifikat,
  HakTanggunganElektronik,
} from "./pages/sertifikasi";
import { LayananUmum } from "./pages/kinerjaLayanan";
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

import IframeGenerator from "./embed/IframeGenerator";

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
        <Route path="/PSN/PTSL">
          <PTSL />
        </Route>
        <Route path="/Sertifikasi/StatistikSertifikat">
          <StatistikSertifikat />
        </Route>
        <Route path="/Sertifikasi/HakTanggunganElektronik">
          <HakTanggunganElektronik />
        </Route>
        {/* Start Route PNBP */}
        <Route path="/PNBP/RealisasiAnggaran">
          <RealisasiAnggaran />
        </Route>
        <Route path="/PNBP/PagudanMp">
          <PaguMp />
        </Route>
        <Route path="/PNBP/PnbpPaguMpOpsNon">
          <PnbpPaguMpOpsNon />
        </Route>
        <Route path="/PNBP/RealisasiTargetPenerimaan">
          <RealisasiTargetPenerimaan />
        </Route>
        <Route path="/PNBP/RealisasiPengunaan">
          <RealisasiPengunaan />
        </Route>
        <Route path="/PNBP/RealisasiPenerimaan">
          <RealisasiPenerimaan />
        </Route>
        <Route path="/PNBP/PnbpBerkasWilayah">
          <PnbpBerkasWilayah />
        </Route>
        <Route path="/PNBP/PnbpBerkasPeringkat">
          <PnbpBerkasPeringkat />
        </Route>
        <Route path="/PNBP/PnbpBerkasPeringkatWilayah">
          <PnbpBerkasPeringkatWilayah />
        </Route>
        <Route path="/PNBP/AlokasiAnggaran">
          <AlokasiAnggaran />
        </Route>
        <Route path="/PNBP/PeringkatRealisasi">
          <PeringkatRealisasi />
        </Route>
        <Route path="/PNBP/PengembalianPNBP">
          <PengembalianPNBP />
        </Route>
        <Route path="/PNBP">
          <PnbpPage />
        </Route>
        {/* End Route PNBP */}
        {/* Start Route BPHTB */}
        <Route path="/BPHTB/BPHTBJumlahBerkas">
          <BPHTBJumlahBerkas />
        </Route>
        <Route path="/BPHTB/BPHTBJumlahIntegrasi">
          <BPHTBJumlahIntegrasi />
        </Route>
        <Route path="/BPHTB">
          <BPHTBPage />
        </Route>
        {/* End Route BPHTB */}
        {/* start route pegawai atr */}
        <Route path="/PegawaiAtr/KepegawaianBPNPendidikan">
          <BPHTBPage />
        </Route>
        <Route path="/PegawaiAtr/KepegawaianBPNUsia">
          <BPHTBPage />
        </Route>
        <Route path="/PegawaiAtr/KepegawaianBPNJK">
          <BPHTBPage />
        </Route>
        <Route path="/PegawaiAtr/KepegawaianBPNGol">
          <BPHTBPage />
        </Route>
        <Route path="/PegawaiAtr/KepegawaianBPNJabatan">
          <KepegawaianBPNJabatan />
        </Route>
        <Route path="/PegawaiAtr">
          <PegawaiAtr />
        </Route>
        {/* end route pegawai atr */}
        <Route path="/KinerjaLayanan/LayananUmum">
          <LayananUmum />
        </Route>
        <Route path="/embed/:view" component={IframeGenerator} />
        <Route path="/" exact>
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
