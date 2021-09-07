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
import SieLayananJumlahPerjenis from "../pages/kinerjaLayanan/layananUmum/sie_layanan_jumlah_perjenis";
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
          <RealisasiAnggaran />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-pagu-mp":
        ReactDOM.render(<PaguMp />, document.getElementById("replace-tag"));
        break;
      case "sie-pnbp-pagu-mp-ops-non":
        ReactDOM.render(
          <PaguMpOpsNon />,
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
          <PeringkatRealisasi />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-alokasi-anggaran":
        ReactDOM.render(
          <AlokasiAnggaran />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-berkas-peringkat-wilayah":
        ReactDOM.render(
          <PnbpBerkasPeringkatWilayah />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-berkas-peringkat":
        ReactDOM.render(
          <PnbpBerkasPeringkat />,
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
          <RealisasiPenerimaan />,
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
          <RealisasiTargetPenerimaan />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-psn-ptsl-5peringkat":
        ReactDOM.render(
          <SiePsnPtsl5Peringkat />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-layanan-jumlah-perjenis":
        ReactDOM.render(
          <SieLayananJumlahPerjenis />,
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
