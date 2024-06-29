import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://hybrid.srishticampus.in:4023/community_connect2_api/",
  headers: {
    "Content-Type": "application/json",
  },
});
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4023/community_connect2_api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default axiosInstance;
