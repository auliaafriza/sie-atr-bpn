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

export const getWilayahApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Sertifikasi/TanahAsetPemerintah/sie_sertifikasi_aset_pemerintah_filter_kanwil`
  );
};

export const getWhoamiApi = () => {
  return apiClient.get(`http://siedev.atrbpn.go.id/SIEBackend/ApiUsers/WhoAmI`);
};
