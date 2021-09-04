import { apiClient } from "./apiClient";

export const getKanwilApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Sertifikasi/StatistikSertifikat/get_kanwil`);
};

export const getTipeHakApi = () => {
  return apiClient.get(`Sertifikasi/StatistikSertifikat/get_tipehak`);
};
