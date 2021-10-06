import axios from "axios";
// general api client host for sisforen

// export const url = "http://10.20.56.205:5000/";
export const url = "https://sie.atrbpn.go.id/";
// export const url = "http://10.20.57.234/SIEBackEnd/";

export const apiClient = axios.create({
  // baseURL: "http://10.20.57.234/SIEBackEnd/",
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientLogin = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
