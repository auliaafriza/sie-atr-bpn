import { apiClient } from "./apiClient";

export const getTahunMutasiApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/get_tahun_mutasi`);
};
