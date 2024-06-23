import { useState, useEffect } from "react";
import { GrFormUpload } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { useContext } from "react";
import AuthContext from "../../../Context/authContext";
import BASE_URL from "../../../api/Backend-url";
import "./userInfo.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/BaseUrl";
const UserInfo2 = ({ activeUser }) => {
  const navigate = useNavigate();
  const { userContext } = useContext(AuthContext);
  if (userContext.userType == "") {
    console.log("user data not found login first");
    navigate("/");
  }
  const [userImgPath, setUserImgPath] = useState("");
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePicture:
      "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
  });
  const [commonMan, setCommonMan] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const imgPath = userContext?.userData?.img?.filename || null;
    if (imgPath) {
      setUserImgPath(imgPath);
    }
  }, [userContext]);
  const getUserData = () => {
    if (userContext?.userData) {
      let name = "";
      let phoneNumber = "";
      if (userContext.userType === "user") {
        console.log("user usercontext", userContext);
        name =
          userContext.userData?.firstName +
          " " +
          userContext.userData?.lastName;
        phoneNumber = userContext.userData.phoneNumber;
      } else {
        console.log("orp or org usercontext", userContext);
        name = userContext.userData.name;
        phoneNumber = userContext.userData.phoneNumber;
      }

      let { email } = userContext.userData;
      const role = userContext.userType;
      let newObj = { name, email, phoneNumber, role };
      setuserInfo({
        ...userInfo,
        ...newObj,
      });
    } else {
      console.log("user data not found");
    }
  };

  useEffect(() => {
    const activeUserId = userContext?.userData?._id || null;
    if (activeUserId) {
      if (userContext.userType == "user") {
        getActiveUserData(activeUserId);
      } else if (userContext.userType == "organization") {
        getActiveOrgData(activeUserId);
      }
    } else {
      console.log("Active User id is invalid.");
    }
  }, [userContext]);

  async function getActiveUserData(id) {
    try {
      let res = await axiosInstance.get("user/get-user-by-id/" + id);

      let data = res?.data?.data || null;
      if (data) {
        setCommonMan(data);
      }
    } catch (error) {
      console.log("error on get active user id", error);
    }
  }
  async function getActiveOrgData(id) {
    try {
      let res = await axiosInstance.get("organization/get-org-by-id/" + id);

      let data = res?.data?.data || null;
      if (data) {
        setCommonMan(data);
      }
    } catch (error) {
      console.log("error on get active user id", error);
    }
  }

  useEffect(() => {}, [commonMan]);
  return (
    <div className="userinfo-container">
      <h5> Personal Profile </h5>
      <div className="profile-img-section">
        <div className="item-1">
          {userImgPath ? (
            <img src={`${BASE_URL}${userImgPath}`} alt="profile-img" />
          ) : (
            <img src={`${userInfo?.profilePicture}`} alt="profile-img" />
          )}
        </div>
      </div>
      <div className="user-details">
        <div>
          <p className="user-title"> Name</p>
          <p className="user-data">{userInfo.name}</p>
        </div>
        {activeUser === "orphanage" ? (
          <div>
            <p className="user-title">Total Received Amount </p>
            <p className="user-data">
              <span> ₹ </span> {userContext?.userData?.totalReceivedAmt || 0}
            </p>
          </div>
        ) : (
          <div>
            <p className="user-title">Total Donated Amount</p>
            <p className="user-data">
              <span> ₹ </span> {commonMan?.totalDonatedAmt || 0}
            </p>
          </div>
        )}

        <div>
          <p className="user-title">Role</p>
          <p className="user-data">{userContext?.userType}</p>
        </div>

        <div>
          <p className="user-title"> Contact Information</p>
          <div className="contact-links-container">
            <div>
              <div className="contact">
                <AiOutlineMail />
                <p>Mail ID:</p>
                <p>{userContext?.userData?.email}</p>
              </div>
              {/* <button onClick={removeEmail}>Remove</button> */}
            </div>
            <div>
              <div className="contact">
                <BiPhoneCall />
                <p>Phone Number:</p>
                <p>{userContext?.userData?.phoneNumber}</p>
              </div>
              {/* <button onClick={removePhonenumber}>Remove</button> */}
            </div>
            {/* <button id="edit-profile-btn">Edit Profile</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo2;
