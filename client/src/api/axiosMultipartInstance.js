import axios from "axios";

// const axiosMultipartInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in:4014/community_connect_api/", 
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
const axiosMultipartInstance = axios.create({
  baseURL:  "http://localhost:4014/community_connect_api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export default axiosMultipartInstance;
