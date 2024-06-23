import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Table } from "react-bootstrap";
import InstituteNavbar from "../../../Components/Institutes/InstitutesNavbar/instituteNavbar";
const InsViewRequests = () => {
  const [allReqs, setAllReqs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let insData = localStorage.getItem("institute-data") || null;
    if (insData) {
      insData = JSON.parse(insData);
      getDonationRequests(insData._id);
    } else {
      console.log("Inst data not found in local storage");
      alert("Please login again");
      navigate("/user/login");
    }
  }, []);

  async function getDonationRequests(id) {
    try {
      let res = await axiosInstance.get(
        "ins-donation-request/get-all-requests-by-ins-id/" + id
      );
      let data = res?.data?.data || null;
      if (data) {
        setAllReqs(data);
      }
    } catch (error) {
      console.log("error on get donation request", error);
    }
  }
  useEffect(() => {
    console.log("aa", allReqs);
  }, [allReqs]);
  return (
    <div>
      <div
        style={{ position: "relative", top: "-48px" }}
        className="bg-primary"
      >
        <InstituteNavbar />
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
          <div style={{ position: "relative", top: "20px" }}>
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
                  <th>Donation Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {allReqs.map((req) => {
                  console.log("reqq", req)
                  return (
                    <tr>
                      <td>{req.title}</td>
                      <td>{req.category}</td>
                      <td>{req.targetAmount}</td>
                      <td>{req.urgencyLevel}</td>
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

export default InsViewRequests;
