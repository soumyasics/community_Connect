import { useState, useEffect } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import UserNavbar from "../../../Components/User/UserNavbar/userNavbar.jsx";
import UserFooter from "../../../Components/Common/UserFooter/userFooter.jsx";
import AuthContext from "../../../Context/authContext.js";
import MyActivity from "./newActivity.jsx";
import NewUserInfo from "./newUserInfo.jsx";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar.jsx";
import "./newUserProfile.css";
import InstituteNavbar from "../../../Components/Institutes/InstitutesNavbar/instituteNavbar.jsx";

const InstituteProfile = ({ activeUser }) => {
  const { logoutUserContext } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("institute-data")) || null;
    if (!userData) {
      alert("Please login");
      navigate("/user/login");
    }
  }, []);

  const redirectHome = () => {
    navigate("/institute");
  };

  const handleLogout = () => {
    if (localStorage.getItem("user-data")) {
      localStorage.removeItem("user-data");
    }
    if (localStorage.getItem("orphanage-data")) {
      localStorage.removeItem("orphanage-data");
    }
    if (localStorage.getItem("organization-data")) {
      localStorage.removeItem("organization-data");
    }
    if (localStorage.getItem("lastDonation")) {
      localStorage.removeItem("lastDonation");
    }

    if (localStorage.getItem("institute-data")) {
      localStorage.removeItem("institute-data");
    }

    logoutUserContext();
    navigate("/user/login");
  };

  return (
    <>
      <InstituteNavbar />

      <div className="profile-container">
        <div className="profile-info-container">
          <div className="sidebar-options">
            <div className="settings-div">
              <div onClick={redirectHome}>
                <AiOutlineArrowLeft />
              </div>
              <AiOutlineSetting />
              <p>Settings</p>
            </div>
            <div className="sidebar-items">
              <div>My Profile</div>

              <div
                className="text-danger font-weight-bold"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
          <>
            <NewUserInfo activeUser={activeUser} />
          </>
        </div>
      </div>
      <UserFooter />
    </>
  );
};
export default InstituteProfile;
