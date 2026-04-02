import axios from "axios";

// custom api hook 

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default api;
