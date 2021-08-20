import axios from "axios";
// general api client host for sisforen
export const apiClient = axios.create({
  baseURL: "http://10.20.57.234/SIEBackEnd/",
  headers: {
    "Content-Type": "application/json",
  },
});
