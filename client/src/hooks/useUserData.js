import { useState } from "react";
import axiosInstance from "../api/BaseUrl";
import { useContext } from "react";
import AuthContext from "../Context/authContext";

// get user data from backend and modify user data to localstorage and context
const useUserData = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const { loginUserContext } = useContext(AuthContext);
  const getUserData = async (userId) => {
    try {
      const res = await axiosInstance.get(`user/get-user-by-id/${userId}`);
      console.log("respon", res);
      if (res.status === 200) {
        const newUserData = res?.data?.data || null;
        console.log("new user ", newUserData);
        if (newUserData) {
          loginUserContext("user", newUserData);
          localStorage.setItem("user-data", JSON.stringify(newUserData));
        }
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      console.log("error on userUserData", error);
    }
    // localStorage.
  };
  return { getUserData };
};

export default useUserData;
