import { apiClient } from "./apiClient";

export const getTahunApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Mitra/StatistikKemitraan/sie_mitra_statistik_kemitraan_filter_tahun`
  );
};

export const getKantahApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Mitra/StatistikKemitraan/sie_mitra_statistik_kemitraan_filter_kantah`
  );
};

export const getKanwilApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Mitra/StatistikKemitraan/sie_mitra_statistik_kemitraan_filter_kanwil`
  );
};
