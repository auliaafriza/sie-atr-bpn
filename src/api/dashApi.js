import { apiClient } from "./apiClient";

export const getPaguMpApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Aset&Keuangan/PNBP/1.1.8`);
};

export const getAnggaranRealisasiApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Aset&Keuangan/PNBP/1.1.3`);
};
