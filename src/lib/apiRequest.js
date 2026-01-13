import axios from "axios";
const apiRequest = axios.create({
  baseURL: "https://e-housing-e4yj.onrender.com/api",
  withCredentials: true,
});
export default apiRequest;
