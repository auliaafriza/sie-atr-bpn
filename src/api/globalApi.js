import { apiClient } from "./apiClient";

export const getSatkerApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/get_satker`);
};

export const getKantorApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/get_kantor`);
};

export const getKanwilApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Kepegawaian/Pegawai/get_kanwil`);
};
