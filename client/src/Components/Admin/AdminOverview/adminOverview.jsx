import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import BarChart from "../../Charts/BarChart/barChart";
import PieChart from "../../Charts/PieChart/pieChart";
import Doughnut from "../../Charts/Doughnut/doughnut";
import LineChart from "../../Charts/LineChart/lineChart";
import "./adminOverview.css";
const AdminOverview = () => {
  const [usersData, setUsersData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [orpData, setOrpData] = useState([]);
  const [insData, setInsData] = useState([]);

  const [allUsersDataLength, setAllUsersDataLength] = useState([0, 0, 0, 0]);
  const [donationReqCount, setDonationReqCount] = useState([0, 0]); // [pending, fullfilled]
  const [dataSet, setDataSet] = useState({
    labels: ["Users", "Orphanages", "Organizations", "Institutes"],
    datasets: [
      {
        label: "Total Users",
        data: allUsersDataLength,
      },
    ],
    hoverOffset: 3,
    backgroundColor: ["#6366f1", "#f79009", "#10b981", "#FF0000"]
  });
  const [donationDataSet, setDonationDataSet] = useState({
    labels: ["pending", "fullfilled"],
    datasets: [
      {
        label: "Donation status",
        data: donationReqCount,
      },
    ],
    backgroundColor: ["red", "green"],
  });

  useEffect(() => {
    getAllUsers();
    getAllOrp();
    getAllOrg();
    getDonationReq();
    getAllIns();
  }, []);

  useEffect(() => {
    setAllUsersDataLength([usersData.length, orpData.length, orgData.length, insData.length]);
  }, [usersData, orgData, orpData, insData]);

  // updating chart when alluserdata length change
  useEffect(() => {
    setDataSet({
      labels: ["Users", "Orphanages", "Organizations", "Institutes"],
      datasets: [
        {
          label: "Total Users",
          data: allUsersDataLength,
          backgroundColor: ["#6366f1", "#f79009", "#10b981", "#FF0000"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [allUsersDataLength]);

  // updating donation req chart

  useEffect(() => {
    setDonationDataSet({
      labels: ["pending", "fullfilled"],
      datasets: [
        {
          label: "Count",
          data: donationReqCount,
          backgroundColor: ["#36a2eb", "#ff6384"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [donationReqCount]);
  // get donation reqs data

  function totalDonationRequests() {
    return donationReqCount[0] + donationReqCount[1];
  }
  function totalUsers() {
    return (
      allUsersDataLength[0] + allUsersDataLength[1] + allUsersDataLength[2] + allUsersDataLength[3]
    );
  }
  const getDonationReq = async () => {
    try {
      const res = await axiosInstance.get("donation-request/get-all-requests");
      const data = res?.data?.data;

      let totalReq = 0;

      data.forEach((elem) => {
        if (elem.isAdminApproved == "approved") {
          totalReq++;
        }
      });
      let totalFulfilled = 0;

      data.forEach((elem) => {
        if (elem.status === "fulfilled" && elem.isAdminApproved == "approved") {
          totalFulfilled++;
        }
      });
      console.log("total req", totalReq);

      setDonationReqCount([totalReq - totalFulfilled, totalFulfilled]);
    } catch (error) {
      console.log("error on get all users", error?.message);
    }
  };

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
  const getAllOrp = async () => {
    try {
      const res = await axiosInstance.get("orphanage/get-all-orphanages");
      const allOrp = res?.data?.data;
      if (allOrp.length > 0) {
        setOrpData(allOrp);
      }
    } catch (error) {
      console.log("error on get all orp", error?.message);
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
  const getAllIns = async () => {
    try {
      const res = await axiosInstance.get("institute/get-all-institutions");
      const allIns = res?.data?.data;
      if (allIns.length > 0) {
        setInsData(allIns);
      }
    } catch (error) {
      console.log("error on get all ins", error?.message);
    }
  };
  
  return (
    <>
      <h1 className="ml-4"> Admin overview</h1>
      <div className="d-flex gap-5 justify-content-around mt-5">
        <div
          style={{ width: "35%" }}
          className="admin-overview-barchart-container "
        >
          <h2> Donations Pending & Fullfilled</h2>
          <p>
            Total Admin Approved Donation Requests are {totalDonationRequests()}{" "}
          </p>
          <PieChart chartData={donationDataSet} />
        </div>

        <div
          style={{ width: "35%" }}
          className="admin-overview-barchart-container"
        >
          <h2> Total Number of Users</h2>
          <p className="mb-5">Total Users {totalUsers()} </p>
          <Doughnut chartData={dataSet} />
        </div>
      </div>
    </>
  );
};
export default AdminOverview;
