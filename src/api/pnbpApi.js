import { apiClient } from "./apiClient";

export const getRealisasiPenggunaanFilterApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Aset&Keuangan/PNBP/sie_pnbp_realisasi_penggunaan_filter_kantor`
  );
};

export const getPengembalianPnbpFilterApi = () => {
  return apiClient.get(
    `Aset&Keuangan/PNBP/sie_pengembalian_pnbp_filter_sakter`
  );
};

export const getBerkasPnbpWilayahFilterApi = () => {
  return apiClient.get(`Aset&Keuangan/PNBP/sie_pnbp_berkas_filter_wilayah`);
};

export const getBerkasPnbpKantorFilterApi = () => {
  return apiClient.get(`Aset&Keuangan/PNBP/sie_pnbp_berkas_filter_kantor`);
};
