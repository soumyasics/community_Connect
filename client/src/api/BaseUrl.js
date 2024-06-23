import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in:4014/community_connect_api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:4014/community_connect_api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
