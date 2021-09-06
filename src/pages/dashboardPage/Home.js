import React, { useEffect } from "react";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { useDispatch } from "react-redux";
import PnbpBerkasWilayah from "../pnbp/sie-pnbp-berkas-wilayah";
import BerkasWilayahPnbp from "../pnbp/sie-pnbp-berkas-wilayahPNBP";
import PnbpBerkasPeringkat from "../pnbp/sie-pnbp-berkas-peringkat";
import PnbpBerkasPeringkatWilayah from "../pnbp/sie-pnbp-berkas-peringkat-wilayah";
import RealisasiPenggunaan from "../pnbp/sie-pnbp-realisasi-pengunaan";
import RealisasiPenerimaan from "../pnbp/sie-pnbp-realisasi-penerimaan";
import RealisasiTargetPenerimaan from "../pnbp/sie-pnbp-realisasi-target-penerimaan";
import AlokasiAnggaran from "../pnbp/sie-pnbp-alokasi-anggaran";
import PengembalianPNBP from "../pnbp/sie-pengembalian-pnbp";
import PeringkatRealisasi from "../pnbp/sie-peringkat-realisasi";
import RealisasiAnggaran from "../pnbp/sie-pnbp-realisasi-anggaran";
import PaguMp from "../pnbp/sie-pnbp-pagu-mp";
import BPHTBJumlahBerkas from "../bphtb/bphtb-jumlah-berkas";
import BPHTBDaerahTerintegrasi from "../bphtb/bphtb-jumlah-terintegrasi";
import KepegawaianBpnGol from "../kepegawaian/kepegawaian-atr-bpn-golongan";
import KepegawaianBpnJabatan from "../kepegawaian/kepegawaian-atr-bpn-jabatan";
import KepegawaianBpnJK from "../kepegawaian/kepegawaian-atr-bpn-JK";
import KepegawaianBpnPendidikan from "../kepegawaian/kepegawaian-atr-bpn-pendidikan";
import KepegawaianBpnUsia from "../kepegawaian/kepegawaian-atr-bpn-usia";
import Sie_sertifikat_jangka_waktu_hak from "../sertifikasi/statistikSertifikat/sie_sertifikat_jangka_waktu_hak";
import PaguMpOpsNon from "../pnbp/sie_pnbp_pagu_mp_ops_non";

const DashHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);

  return (
    <div>
      <Sie_sertifikat_jangka_waktu_hak />
      <PaguMpOpsNon />
      {/* <PnbpBerkasWilayah />
      <PnbpBerkasPeringkat />
      <PnbpBerkasPeringkatWilayah />
      <RealisasiAnggaran /> */}
      <RealisasiPenggunaan />
      {/* <RealisasiPenerimaan />
      <RealisasiTargetPenerimaan />
      <PaguMp />
      <AlokasiAnggaran />
      <PeringkatRealisasi />
      <PengembalianPNBP /> */}
      <BPHTBJumlahBerkas />
      <BPHTBDaerahTerintegrasi />
      <KepegawaianBpnGol />
      <KepegawaianBpnJabatan />
      <KepegawaianBpnJK />
      <KepegawaianBpnPendidikan />
      <KepegawaianBpnUsia />
    </div>
  );
};

export default DashHome;
