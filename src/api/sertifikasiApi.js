import { apiClient } from "./apiClient";

export const getKanwilApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(`Sertifikasi/StatistikSertifikat/get_kanwil`);
};

export const getTipeHakApi = () => {
  return apiClient.get(`Sertifikasi/StatistikSertifikat/get_tipehak`);
};

export const getNamaProfileApi = () => {
  return apiClient.get(
    `Aset&Keuangan/PNBP/sie_pnbp_kinerja_peny_berkas_per_jabatan_filter_namaprofile`
  );
};
