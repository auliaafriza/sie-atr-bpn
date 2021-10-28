import React from "react";
import "./index.css";
import Login from "./pages/loginPage/login";
import Dashboard from "./pages/dashboardPage/dashboard";
import Page404 from "./pages/dashboardPage/page404";
import PrintData from "./pages/pnbp/printData/componentPrint";
import { PTSL, PengadaanTanah, RA, RDTR, IndexTanah } from "./pages/psn";
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
  PersentaseRealisasiBelanja,
  KinerjaBerkasPnbp,
  PnbpPage,
} from "./pages/pnbp";
import { Mitra } from "./pages/mitra";
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
  KepegawaianBPNMutasi,
  KepegawaianOrganisasi,
  PegawaiAtr,
  Organisasi,
  PegawaiAtrGol,
  PegawaiAtrJabatan,
  PegawaiAtrJK,
  PegawaiAtrPensiun,
  PegawaiAtrPendidikan,
  LandingPagePegawai,
} from "./pages/kepegawaian";
import {
  StatistikSertifikat,
  HakTanggunganElektronik,
  TanahAssetPemerintah,
  SertipikatDiagunkan,
  LuasBidang,
  JangkaWaktu,
  JumlahSertifikat,
} from "./pages/sertifikasi";
import { LayananUmum, Tunggakan, PNBP } from "./pages/kinerjaLayanan";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
// ****** untuk menu *******
import Header from "./component/Header";
// import Header from "./component/HeaderHtml";
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
          <PengadaanTanah />
        </Route>
        <Route path="/PSN/IndexTanah">
          <IndexTanah />
        </Route>
        <Route path="/PSN/PTSL">
          <PTSL />
        </Route>
        <Route path="/PSN/RA">
          <RA />
        </Route>
        <Route path="/PSN/RDTR">
          <RDTR />
        </Route>
        <Route path="/Sertipikasi/StatistikSertipikat">
          <StatistikSertifikat />
        </Route>
        <Route path="/Sertifikasi/HakTanggunganElektronik">
          <HakTanggunganElektronik />
        </Route>
        <Route path="/Sertifikasi/TanahAssetPemerintah">
          <TanahAssetPemerintah />
        </Route>
        <Route path="/Sertipikasi/SertipikatDiagunkan">
          <SertipikatDiagunkan />
        </Route>
        <Route path="/Sertipikasi/LuasBidangSertipikasi">
          <LuasBidang />
        </Route>
        <Route path="/Sertipikasi/JangkaWaktuHakSertipikasi">
          <JangkaWaktu />
        </Route>
        <Route path="/Sertipikasi/JumlahSertipikasidanLuas">
          <JumlahSertifikat />
        </Route>
        {/* Start Route PNBP */}
        <Route path="/AssetKeuangan/PNBP/RealisasiAnggaran">
          <RealisasiAnggaran />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PagudanMp">
          <PaguMp />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PnbpPaguMpOpsNon">
          <PnbpPaguMpOpsNon />
        </Route>
        <Route path="/AssetKeuangan//PNBP/RealisasiTargetPenerimaan">
          <RealisasiTargetPenerimaan />
        </Route>
        <Route path="/AssetKeuangan//PNBP/RealisasiPengunaan">
          <RealisasiPengunaan />
        </Route>
        <Route path="/AssetKeuangan//PNBP/RealisasiPenerimaan">
          <RealisasiPenerimaan />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PnbpBerkasWilayah">
          <PnbpBerkasWilayah />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PnbpBerkasPeringkat">
          <PnbpBerkasPeringkat />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PnbpBerkasPeringkatWilayah">
          <PnbpBerkasPeringkatWilayah />
        </Route>
        <Route path="/AssetKeuangan//PNBP/AlokasiAnggaran">
          <AlokasiAnggaran />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PeringkatRealisasi">
          <PeringkatRealisasi />
        </Route>
        <Route path="/AssetKeuangan//PNBP/PengembalianPNBP">
          <PengembalianPNBP />
        </Route>
        <Route path="/AssetKeuangan/PNBP/PersentaseRealisasiBelanja">
          <PersentaseRealisasiBelanja />
        </Route>
        <Route path="/AssetKeuangan/PNBP/KinerjaBerkasPnbp">
          <KinerjaBerkasPnbp />
        </Route>
        <Route path="/AssetKeuangan/PNBP">
          <PnbpPage />
        </Route>
        {/* End Route PNBP */}
        {/* start mitra */}
        <Route path="/Mitra/StatistikKemitraan">
          <Mitra />
        </Route>
        {/* end mitra */}
        {/* Start Route BPHTB */}
        <Route path="/AssetKeuangan//BPHTB/BPHTBJumlahBerkas">
          <BPHTBJumlahBerkas />
        </Route>
        <Route path="/AssetKeuangan//BPHTB/BPHTBJumlahIntegrasi">
          <BPHTBJumlahIntegrasi />
        </Route>
        <Route path="/AssetKeuangan/BPHTB">
          <BPHTBPage />
        </Route>
        {/* End Route BPHTB */}
        {/* start route pegawai atr */}
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNPendidikan">
          <BPHTBPage />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNUsia">
          <BPHTBPage />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNJK">
          <BPHTBPage />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNGol">
          <BPHTBPage />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNJabatan">
          <KepegawaianBPNJabatan />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr/KepegawaianBPNMutasi">
          <KepegawaianBPNMutasi />
        </Route>
        <Route path="/Kepegawaian/PegawaiAtr">
          <PegawaiAtr />
        </Route>
        <Route path="/Kepegawaian/JumlahPegawaperPendidikanAtr">
          <PegawaiAtrPendidikan />
        </Route>
        <Route path="/Kepegawaian/PrediksiPegawaiAtrPensiun">
          <PegawaiAtrPensiun />
        </Route>
        <Route path="/Kepegawaian/JumlahPegawaperJenisKelaminAtr">
          <PegawaiAtrJK />
        </Route>
        <Route path="/Kepegawaian/JumlahPegawaperJabatanAtr">
          <PegawaiAtrJabatan />
        </Route>
        <Route path="/Kepegawaian/JumlahPegawaperGolonganAtr">
          <PegawaiAtrGol />
        </Route>
        <Route path="/Kepegawaian/Organisasi">
          <Organisasi />
        </Route>
        <Route path="/Kepegawaian/Organisasi/KepegawaianOrganisasi">
          <KepegawaianOrganisasi />
        </Route>
        <Route path="/Kepegawaian/DashboardKepegawaian">
          <LandingPagePegawai />
        </Route>
        {/* end route pegawai atr */}
        <Route path="/KinerjaLayanan/LayananUmum">
          <LayananUmum />
        </Route>
        <Route path="/KinerjaLayanan/Tunggakan">
          <Tunggakan />
        </Route>
        <Route path="/KinerjaLayanan/PNBP">
          <PNBP />
        </Route>
        <Route path="/embed/:view" component={IframeGenerator} />
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {!noFooter && <Footer />}
    </div>
  );
});

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Main />
    </Router>
  );
}
