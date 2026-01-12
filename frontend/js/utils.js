export const BASE_URL = "http://localhost:4000/api";

//token store in browser
export const getToken = () => {
  return localStorage.getItem("token");
};
