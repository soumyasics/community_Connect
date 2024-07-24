import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Table } from "react-bootstrap";
export const ViewOrphangeSponsers = () => {
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
        "donation/donations-to-single-orphanage/" + id
      );
      let data = res?.data?.data || null;
      console.log("data, data", data);
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
            No sponsors data found.
          </h1>
        ) : (
          <div className="mt-5" style={{ position: "relative", top: "30px" }}>
            <h1 className="text-center mt-5"> Orphanage sponsers </h1>
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
                  <th> No.</th>
                  <th>Name </th>
                  <th>Mode of payment </th>
                  <th>Donated amount </th>
                  <th>Request title </th>
                  <th>Category</th>
                  <th>Urgency Level</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {allReqs.map((req, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{req?.accountHolderName}</td>
                      <td>{req?.modeOfPayment}</td>
                      <td>{req?.donatedAmount}</td>
                      <td>{req?.requestId?.title}</td>
                      <td>{req?.requestId?.category}</td>
                      <td>{req?.requestId?.urgencyLevel}</td>
                      <td>{req?.requestId?.description}</td>
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
