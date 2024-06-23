import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar.jsx";
import UserInfo from "./userInfo.jsx";
// import ListBookings from "../Components/List-Bookings/list-bookings.jsx";
import "./userProfile.css";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar.jsx";
import UserFooter from "../../../Components/Common/UserFooter/userFooter.jsx";
import { useContext } from "react";
import MyActivity from "./activities.jsx";
import AuthContext from "../../../Context/authContext.js";

const UserProfile2 = ({ activeUser }) => {
  const { logoutUserContext } = useContext(AuthContext);

  const [renderdItem, setRenderdItem] = useState("UserInfo");
  const navigate = useNavigate();

  useEffect(() => {
    const orpData = JSON.parse(localStorage.getItem("orphanage-data")) || null;
    console.log("orp data22", orpData);
    if (!orpData) {
      alert("Please login");
      navigate("/user/login");
    }
  }, []);

  const redirectHome = () => {
    if (activeUser === "orphanage") {
      navigate("/orphanage");
    } else {
      navigate("/");
    }
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

    logoutUserContext();
    navigate("/user/login");
  };

  const renderNavbar = () => {
    switch (activeUser) {
      case "orphanage":
        return <OrphanageNavbar />;
      default:
        return <UserNavbar />;
    }
  };

  return (
    <>
      {renderNavbar()}
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
              <div
                onClick={() => {
                  setRenderdItem("UserInfo");
                }}
              >
                My Profile
              </div>
              {activeUser !== "orphanage" && (
                <div
                  onClick={() => {
                    setRenderdItem("activity");
                  }}
                >
                  My Activity
                </div>
              )}

              <div
                className="text-danger font-weight-bold"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
          <>
            {renderdItem === "UserInfo" && <UserInfo activeUser={activeUser} />}

            {renderdItem === "activity" && <MyActivity />}
          </>
        </div>
      </div>
      <UserFooter />
    </>
  );
};
export default UserProfile2;
