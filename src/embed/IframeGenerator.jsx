import React from "react";
import ReactDOM from "react-dom";

import RealisasiAnggaran from "../pages/pnbp/sie-pnbp-realisasi-anggaran";
import PaguMp from "../pages/pnbp/sie-pnbp-pagu-mp.js";
import PaguMpOpsNon from "../pages/pnbp/sie_pnbp_pagu_mp_ops_non";
import PengembalianPNBP from "../pages/pnbp/sie-pengembalian-pnbp";
import PeringkatRealisasi from "../pages/pnbp/sie-peringkat-realisasi";
import AlokasiAnggaran from "../pages/pnbp/sie-pnbp-alokasi-anggaran";
import PnbpBerkasPeringkatWilayah from "../pages/pnbp/sie-pnbp-berkas-peringkat-wilayah";
import PnbpBerkasPeringkat from "../pages/pnbp/sie-pnbp-berkas-peringkat";
import PnbpBerkasWilayah from "../pages/pnbp/sie-pnbp-berkas-wilayah";
import KinerjaBerkasPnbp from "../pages/pnbp/sie-pnbp-kinerja-berkas";
import PersentaseRealisasiBelanja from "../pages/pnbp/sie-pnbp-persentase-realisasi-belanja";
import RealisasiPenerimaan from "../pages/pnbp/sie-pnbp-realisasi-penerimaan";
import RealisasiPenggunaan from "../pages/pnbp/sie-pnbp-realisasi-pengunaan";
import RealisasiTargetPenerimaan from "../pages/pnbp/sie-pnbp-realisasi-target-penerimaan";
import SiePsnPtsl5Peringkat from "../pages/psn/PTSL/sie_psn_ptsl_5peringkat";
import RealisasiPerkegiatan from "../pages/psn/PTSL/sie_ptsl_realisasi_perkegiatan";
import SieLayananJumlahPerjenis from "../pages/kinerjaLayanan/layananUmum/sie_layanan_jumlah_perjenis";
import BPHTBJumlahBerkas from "../pages/bphtb/bphtb-jumlah-berkas";
import BPHTBDaerahTerintegrasi from "../pages/bphtb/bphtb-jumlah-terintegrasi";
import KepegawaianBpnGol from "../pages/kepegawaian/kepegawaian-atr-bpn-golongan";
import KepegawaianBpnJabatan from "../pages/kepegawaian/kepegawaian-atr-bpn-jabatan";
import KepegawaianBpnJK from "../pages/kepegawaian/kepegawaian-atr-bpn-JK";
import KepegawaianBpnMutasi from "../pages/kepegawaian/kepegawaian-atr-bpn-mutasi";
import KepegawaianBpnPendidikan from "../pages/kepegawaian/kepegawaian-atr-bpn-pendidikan";
import KepegawaianBpnUsia from "../pages/kepegawaian/kepegawaian-atr-bpn-usia";
import KepegawaianOrganisasi from "../pages/kepegawaian/kepegawaian-organisasi";
import SieLayananKebutuhanKantorPertanahan from "../pages/kinerjaLayanan/layananUmum/sie_layanan_kebutuhan_kantor_pertanahan";
import SiePsnRdtr from "../pages/psn/RDTR/sie_psn_rdtr";
import StatistikKemitraan from "../pages/mitra/statistikKemitraan";
import PengadaanTanah from "../pages/psn/pengadaanTanah/sie_psn_luas_pengadaan_tanah";
import SieHtDitutupPerkantor from "../pages/sertifikasi/hakTanggunganElektronik/sie_ht_ditutup_perkantor";
import SieHtJumlahKantorTahun from "../pages/sertifikasi/hakTanggunganElektronik/sie_ht_jumlah_kantor_tahun";
import TerbitTanpaPeriksa from "../pages/sertifikasi/hakTanggunganElektronik/sie_ht_terbit_tanpa_periksa";
import SieHTUploadPpatIpSama from "../pages/sertifikasi/hakTanggunganElektronik/sie_ht_upload_ppat_ipsama ";
import TanahAsetPemerintah from "../pages/sertifikasi/tanahAssetPemerintah/sie_sertifikasi_aset_pemerintah";
import RefromaAgria from "../pages/psn/RA/sie_psn_ra";
import SertifikasiTahun from "../pages/sertifikasi/statistikSertifikat/sie_sertifikasi_tahun";
import SieSertifikasiTargetRealisasi from "../pages/sertifikasi/statistikSertifikat/sie_sertifikasi_target_realisasi";
import SieSertifikasiJangkaWaktuHak from "../pages/sertifikasi/statistikSertifikat/sie_sertifikat_jangka_waktu_hak";
import SieSertifikasiKonsolidasiKota from "../pages/sertifikasi/statistikSertifikat/sie_sertifikat_konsolidasi_kota";
import SieSertifikasiLuasJumlah from "../pages/sertifikasi/statistikSertifikat/sie_sertifikat_luas_jumlah";
import SieTunggakan from "../pages/kinerjaLayanan/tunggakan/sie-tunggakan";
import SieIndexTanah from "../pages/psn/pengadaanTanah/psn-index-nilai-tanah";
import SieTunggakanWilayah from "../pages/kinerjaLayanan/tunggakan/sie-tunggakan-wilayah";
import SiePSNNilaiBPHTB from "../pages/bphtb/sie_psn_nilai_bphtb";
import SiePSNNilaiPNBP from "../pages/kinerjaLayanan/PNBP/sie_psn_nilai_pnbp";
import SiePSNNilaiHt from "../pages/psn/PTSL/sie_psn_nilai_ht";
import SiePSNNilaiJualBeli from "../pages/psn/PTSL/sie_psn_nilai_jual_beli";
import SiePSNNilaiTanahPerKantah from "../pages/psn/PTSL/sie_psn_nilai_tanah_perkantah";
import { Provider } from "react-redux";
import store from "../config/store";

class IframeGenerator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var embed = this.props.match.params.view;

    switch (embed) {
      case "sie-pnbp-realisasi-anggaran":
        ReactDOM.render(
          <Provider store={store}>
            <RealisasiAnggaran />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-pagu-mp":
        ReactDOM.render(
          <Provider store={store}>
            <PaguMp />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-pagu-mp-ops-non":
        ReactDOM.render(
          <Provider store={store}>
            <PaguMpOpsNon />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pengembalian-pnbp":
        ReactDOM.render(
          <Provider store={store}>
            <PengembalianPNBP />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-peringkat-realisasi":
        ReactDOM.render(
          <Provider store={store}>
            <PeringkatRealisasi />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-alokasi-anggaran":
        ReactDOM.render(
          <Provider store={store}>
            <AlokasiAnggaran />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-berkas-peringkat-wilayah":
        ReactDOM.render(
          <Provider store={store}>
            <PnbpBerkasPeringkatWilayah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-berkas-peringkat":
        ReactDOM.render(
          <Provider store={store}>
            <PnbpBerkasPeringkat />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-berkas-wilayah":
        ReactDOM.render(
          <Provider store={store}>
            <PnbpBerkasWilayah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-kinerja-berkas":
        ReactDOM.render(
          <Provider store={store}>
            <KinerjaBerkasPnbp />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-persentase-realisasi-belanja":
        ReactDOM.render(
          <Provider store={store}>
            <PersentaseRealisasiBelanja />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-realisasi-penerimaan":
        ReactDOM.render(
          <Provider store={store}>
            <RealisasiPenerimaan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-realisasi-penggunaan":
        ReactDOM.render(
          <Provider store={store}>
            <RealisasiPenggunaan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-realisasi-target-penerimaan":
        ReactDOM.render(
          <Provider store={store}>
            <RealisasiTargetPenerimaan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-ptsl-5-peringkat":
        ReactDOM.render(
          <Provider store={store}>
            <SiePsnPtsl5Peringkat />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-layanan-jumlah-perjenis":
        ReactDOM.render(
          <Provider store={store}>
            <SieLayananJumlahPerjenis />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "bphtb-jumlah-berkas":
        ReactDOM.render(
          <Provider store={store}>
            <BPHTBJumlahBerkas />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "bphtb-jumlah-terintegrasi":
        ReactDOM.render(
          <Provider store={store}>
            <BPHTBDaerahTerintegrasi />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-golongan":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnGol />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-jabatan":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnJabatan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-JK":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnJK />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-mutasi":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnMutasi />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-pendidikan":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnPendidikan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-atr-bpn-usia":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianBpnUsia />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "kepegawaian-organisasi":
        ReactDOM.render(
          <Provider store={store}>
            <KepegawaianOrganisasi />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-layanan-kebutuhan-kantor-pertanahan":
        ReactDOM.render(
          <Provider store={store}>
            <SieLayananKebutuhanKantorPertanahan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-rdtr":
        ReactDOM.render(<SiePsnRdtr />, document.getElementById("replace-tag"));
        break;
      case "sie-ptsl-realisasi-perkegiatan":
        ReactDOM.render(
          <Provider store={store}>
            <RealisasiPerkegiatan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-statistik-kemitraan":
        ReactDOM.render(
          <Provider store={store}>
            <StatistikKemitraan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-luas-pengadaaan-tanah":
        ReactDOM.render(
          <Provider store={store}>
            <PengadaanTanah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-ht-ditutup-perkantor":
        ReactDOM.render(
          <Provider store={store}>
            <SieHtDitutupPerkantor />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-ht-jumlah-kantor-tahun":
        ReactDOM.render(
          <Provider store={store}>
            <SieHtJumlahKantorTahun />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-ht-terbit-tanpa-periksa":
        ReactDOM.render(
          <Provider store={store}>
            <TerbitTanpaPeriksa />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-ht-upload-ppat-ip-sama":
        ReactDOM.render(
          <Provider store={store}>
            <SieHTUploadPpatIpSama />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-aset-pemerintah":
        ReactDOM.render(
          <Provider store={store}>
            <TanahAsetPemerintah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-reforma-agria":
        ReactDOM.render(
          <Provider store={store}>
            <RefromaAgria />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-tahun":
        ReactDOM.render(
          <Provider store={store}>
            <SertifikasiTahun />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-target-realisasi":
        ReactDOM.render(
          <Provider store={store}>
            <SieSertifikasiTargetRealisasi />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-jangka-waktu-hak":
        ReactDOM.render(
          <Provider store={store}>
            <SieSertifikasiJangkaWaktuHak />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-konsolidasi-kota":
        ReactDOM.render(
          <Provider store={store}>
            <SieSertifikasiKonsolidasiKota />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-sertifikasi-luas-jumlah":
        ReactDOM.render(
          <Provider store={store}>
            <SieSertifikasiLuasJumlah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-tunggakan":
        ReactDOM.render(
          <Provider store={store}>
            <SieTunggakan />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-index-tanah":
        ReactDOM.render(
          <Provider store={store}>
            <SieIndexTanah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-tunggakan-wilayah":
        ReactDOM.render(
          <Provider store={store}>
            <SieTunggakanWilayah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-nilai-bphtb":
        ReactDOM.render(
          <Provider store={store}>
            <SiePSNNilaiBPHTB />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-nilai-pnbp":
        ReactDOM.render(
          <Provider store={store}>
            <SiePSNNilaiPNBP />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-nilai-ht":
        ReactDOM.render(
          <Provider store={store}>
            <SiePSNNilaiHt />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-nilai-jual-beli":
        ReactDOM.render(
          <Provider store={store}>
            <SiePSNNilaiJualBeli />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-nilai-tanah-perkantah":
        ReactDOM.render(
          <Provider store={store}>
            <SiePSNNilaiTanahPerKantah />
          </Provider>,
          document.getElementById("replace-tag")
        );
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div id="replace-tag"></div>
      </div>
    );
  }
}

export default IframeGenerator;
