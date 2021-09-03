import { apiClient } from "./apiClient";

export const getSatkerApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/get_satker`);
};
