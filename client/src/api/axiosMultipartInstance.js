import axios from "axios";

const axiosMultipartInstance = axios.create({
  baseURL: "http://hybrid.srishticampus.in/community_connect2_api/", 
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
// const axiosMultipartInstance = axios.create({
//   baseURL:  "http://localhost:4023/community_connect2_api/",
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
export default axiosMultipartInstance;
