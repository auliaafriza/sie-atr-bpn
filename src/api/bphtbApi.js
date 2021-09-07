import { apiClient } from "./apiClient";

export const getBphtbBerkasFilterApi = () => {
  // apiClientRB.defaults.headers["Authorization"] = "Bearer " + token;
  return apiClient.get(
    `Aset&Keuangan/BPHTB/sie_pengembalian_pnbp_filter_sakter`
  );
};
