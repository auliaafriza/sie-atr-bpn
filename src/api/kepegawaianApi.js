import { apiClient } from "./apiClient";

export const getTahunMutasiApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/sie_pegawai_pensiun_filter_tahun`);
};
