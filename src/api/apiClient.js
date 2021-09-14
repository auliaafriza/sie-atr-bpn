import axios from "axios";
// general api client host for sisforen
export const apiClient = axios.create({
  baseURL: "http://10.20.57.234/SIEBackEnd/",
  // baseURL: "http://10.20.56.205:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientLogin = axios.create({
  baseURL: "http://siedev.atrbpn.go.id/SIEBackend/",
  headers: {
    "Content-Type": "application/json",
  },
});

// export const url = "http://10.20.56.205:5000/";
export const url = "http://10.20.57.234/SIEBackEnd/";
