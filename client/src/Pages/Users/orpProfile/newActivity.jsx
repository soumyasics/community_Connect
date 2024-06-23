import { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import axiosInstance from "../../../api/BaseUrl.js";
import AuthContext from "../../../Context/authContext.js";
import { useContext } from "react";
import "./newActivity.css";

const Activities = () => {
  const [allDonations, setAllDonations] = useState([]);
  const { userContext } = useContext(AuthContext);

  useEffect(() => {
    console.log("us typ", userContext.userType);
    if (userContext.userType === "organization") {
      const activeOrgId = userContext?.userData?._id || null;
      console.log("ac org id", activeOrgId);
      if (activeOrgId) {
        getOrgDonatedData(activeOrgId);
      }
    } else if (userContext.userType === "user") {
      const activeUserId = userContext?.userData?._id || null;
      console.log("ac us id", activeUserId);
      if (activeUserId) {
        getUserDonatedData(activeUserId);
      }
    }
  }, []);

  const getUserDonatedData = async (activeUserId) => {
    const res = await axiosInstance.get(
      "/donation/donations-done-by-single-user/" + activeUserId
    );
    const donations = res?.data?.data || [];
    setAllDonations(donations);
  };

  const getOrgDonatedData = async (activeOrgId) => {
    const res = await axiosInstance.get(
      "/donation/donations-done-by-single-org/" + activeOrgId
    );
    const donations = res?.data?.data || [];
    console.log("org", donations);
    setAllDonations(donations);
  };

  return (
    <>
      <div className="list-bookings-container">
        {allDonations.length > 0 ? (
          <h3>Donations </h3>
        ) : (
          <h3>No Donations Found</h3>
        )}

        <hr />

        {allDonations.length !== 0 && (
          <div className="list-table-div">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> No </th>
                  <th> Orphanage Name </th>
                  <th> Donated Amount </th>
                  <th> Donation Category</th>
                  <th> Date </th>
                  <th> Time</th>
                </tr>
              </thead>
              <tbody>
                {allDonations.length !== 0 &&
                  allDonations?.map((donation, index) => {
                    const createdAtDate = new Date(donation?.createdAt);
                    const formattedDate = createdAtDate.toLocaleDateString();
                    const formattedTime = createdAtDate.toLocaleTimeString();
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{donation.orphanageId.name || "Orphanage Name"}</td>
                        <td>{donation?.donatedAmount || 0}</td>
                        <td>
                          {donation?.requestId?.category ||
                            "Orphanage expenses"}
                        </td>
                        <td>{formattedDate}</td>
                        <td>{formattedTime}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};
export default Activities;
