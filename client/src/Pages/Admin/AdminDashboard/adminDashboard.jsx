import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminOverview from "../../../Components/Admin/AdminOverview/adminOverview";
import AdminUsers from "../../../Components/Admin/AdminUsers/adminUsers";
import AdminOrp from "../../../Components/Admin/AdminOrp/adminOrp";
import AdminDonations from "../../../Components/Admin/AdminDonations/adminDonations";
import AdminOrg from "../../../Components/Admin/AdminOrg/adminOrg";
import AdminEvents from "../../../Components/Admin/AdminEvents/adminEvents";
import AdminSettings from "../../../Components/Admin/AdminSettings/adminSettings";
import AdminDashboardNav from "../../../Components/Admin/AdminDashboardNav/adminDashboardNav";
import AdminDonationRequests from "../../../Components/Admin/AdminDonationRequests/adminDonationRequests";
import AdminCamp from "../../../Components/Admin/AdminCamp/adminCamp";
import AdminLeaderboard from "../../../Components/Admin/AdminLeaderboard/adminLeaderboard"
import "./adminDashboard.css";
import AdminIns from "../../../Components/Admin/AdminIns/adminIns";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("overview");
  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <Fragment>
      <div className="admin-dashboard-container">
        <AdminSidebar
          activePage={activePage}
          changeActivePage={changeActivePage}
        />

        <div className="admin-dashboard-main-bar">
          <AdminDashboardNav/>
          {activePage === "overview" && <AdminOverview />}
          {activePage === "users" && <AdminUsers />}
          {activePage === "orphanages" && <AdminOrp />}
          {activePage === "institutes" && <AdminIns />}
          {activePage === "organizations" && <AdminOrg />}
          {activePage === "donation-requests" && <AdminDonationRequests  />}
          {activePage === "donations" && <AdminDonations />}
          {activePage === "events" && <AdminEvents />}
          {activePage === "settings" && <AdminSettings />}
          {activePage === "camps" && <AdminCamp />}
          {activePage === "leaderboard" && <AdminLeaderboard />}
        </div>
      </div>
    </Fragment>
  );
};
export default AdminDashboard;
