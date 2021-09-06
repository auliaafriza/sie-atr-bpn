import React, { useEffect } from "react";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { useDispatch } from "react-redux";
import PnbpBerkasWilayah from "./sie-pnbp-berkas-wilayah";
import BerkasWilayahPnbp from "./sie-pnbp-berkas-wilayahPNBP";
import PnbpBerkasPeringkat from "./sie-pnbp-berkas-peringkat";
import PnbpBerkasPeringkatWilayah from "./sie-pnbp-berkas-peringkat-wilayah";
import RealisasiPenggunaan from "./sie-pnbp-realisasi-pengunaan";
import RealisasiPenerimaan from "./sie-pnbp-realisasi-penerimaan";
import RealisasiTargetPenerimaan from "./sie-pnbp-realisasi-target-penerimaan";
import AlokasiAnggaran from "./sie-pnbp-alokasi-anggaran";
import PengembalianPNBP from "./sie-pengembalian-pnbp";
import PeringkatRealisasi from "./sie-peringkat-realisasi";
import RealisasiAnggaran from "./sie-pnbp-realisasi-anggaran";
import PaguMp from "./sie-pnbp-pagu-mp";
import PaguMpOpsNon from "./sie_pnbp_pagu_mp_ops_non";

const PnbpPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);

  return (
    <div style={{ paddingBottom: 20, paddingTop: 20 }}>
      <PnbpBerkasWilayah />
      <PnbpBerkasPeringkat />
      <PnbpBerkasPeringkatWilayah />
      <RealisasiAnggaran />
      <RealisasiPenggunaan />
      <RealisasiPenerimaan />
      <RealisasiTargetPenerimaan />
      <PaguMp />
      <PaguMpOpsNon />
      <AlokasiAnggaran />
      <PeringkatRealisasi />
      <PengembalianPNBP />
    </div>
  );
};

export default PnbpPage;
