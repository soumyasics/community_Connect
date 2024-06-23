import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Table } from "react-bootstrap";
const ViewRequests = () => {
  const [allReqs, setAllReqs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let orpData = localStorage.getItem("orphanage-data") || null;
    if (orpData) {
      orpData = JSON.parse(orpData);
      getDonationRequests(orpData._id);
    } else {
      console.log("Orp data not found in local storage");
      alert("Please login again");
      navigate("/user/login");
    }
  }, []);

  async function getDonationRequests(id) {
    try {
      let res = await axiosInstance.get(
        "donation-request/get-all-requests-by-orphanage-id/" + id
      );
      let data = res?.data?.data || null;
      if (data) {
        setAllReqs(data);
      }
    } catch (error) {
      console.log("error on get donation request", error);
    }
  }

  return (
    <div>
      <div
        style={{ position: "relative", top: "-48px" }}
        className="bg-primary"
      >
        <OrphanageNavbar />
      </div>
      <div style={{ minHeight: "400px" }}>
        {allReqs.length == 0 ? (
          <h1
            className="text-center mt-5"
            style={{ position: "relative", top: "200px" }}
          >
            No donation requests
          </h1>
        ) : (
          <div className="mt-5" style={{ position: "relative", top: "30px" }}>
            <h1 className="text-center mt-5"> Donation request status</h1>
            <Table
              style={{ width: "90%" }}
              className="mx-auto mt-5"
              responsive
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th> Title</th>
                  <th>Category</th>
                  <th>Target </th>
                  <th>Urgency </th>
                  <th>Admin Status</th>
                  <th>Donation Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {allReqs.map((req) => {
                  return (
                    <tr>
                      <td>{req.title}</td>
                      <td>{req.category}</td>
                      <td>{req.targetAmount}</td>
                      <td>{req.urgencyLevel}</td>
                      <td>{req.isAdminApproved}</td>
                      <td>{req.status}</td>
                      <td>{req.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <div className="mt-5 w-100">
        <UserFooter />
      </div>
    </div>
  );
};

export default ViewRequests;
