import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.100:4200",
});

export default api;
