import { useState, useEffect } from "react";
import OrphanageNavbar from "../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import UserNavbar from "../../Components/User/UserNavbar/userNavbar";
import CommunityHeader from "../../Components/Common/CommunityHeader/CommunityHeader";
import style from "./leaderboard.module.css";
import growthImg from "../../Assets/Images/growth-img.jpg";
import axiosInstance from "../../api/BaseUrl";
import { Button } from "react-bootstrap";
import UserLeaderBoardTable from "./userLeaderboardTable";
import OrgLeaderBoardTable from "./orgLeaderboardTable";
import UserFooter from "../../Components/Common/UserFooter/userFooter";
import teamImg from "../../Assets/Images/team-img.png";
const LeaderBoard = ({ activeUser }) => {
  const [usersData, setUsersData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [activeTable, setActiveTable] = useState("organization");
  const renderNavbar = () => {
    switch (activeUser) {
      case "orphanage":
        return <OrphanageNavbar />;
      default:
        return <UserNavbar />;
    }
  };

  useEffect(() => {
    getAllOrg();
  }, []);

  useEffect(() => {
    console.log("org data", orgData);
  }, [usersData, orgData]);
  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("user/get-all-users");
      const allUsers = res?.data?.data;
      if (allUsers?.length > 0) {
        setUsersData(allUsers);
      }
    } catch (error) {
      console.log("error on get all users", error?.message);
    }
  };
  const getAllOrg = async () => {
    try {
      const res = await axiosInstance.get("organization/get-all-organizations");
      const allOrg = res?.data?.data;
      if (allOrg.length > 0) {
        setOrgData(allOrg);
      }
    } catch (error) {
      console.log("error on get all org", error?.message);
    }
  };
  console.log(activeTable);
  return (
    <div>
      {renderNavbar()}
      <CommunityHeader
        heading=""
        description=""
        textColor="black"
        imgPath={growthImg}
      />

      <h3 className="text-center mt-3">Organization Leaderboard</h3>
      {activeTable === "users" ? (
        <UserLeaderBoardTable />
      ) : (
        <OrgLeaderBoardTable orgData={orgData} />
      )}

      <div className="mt-5">
        <UserFooter />
      </div>
    </div>
  );
};

export default LeaderBoard;
