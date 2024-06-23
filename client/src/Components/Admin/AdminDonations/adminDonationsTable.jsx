import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import "./adminDonations.css";
import { Table } from "react-bootstrap";

const AdminDonationsTable = () => {
  const [donationList, setDonationList] = useState([]);

  useEffect(() => {
    getDonationData();
  }, []);
  const getDonationData = async () => {
    const res = await axiosInstance.get('/donation/get-all-donations')
    const donationData = res?.data?.data || null;
    if (donationData) {
      console.log("data", donationData);
      // setDonationList(donationData);
    }
  }

  if (donationList.length === 0) {
    return (
      <>
        <h1> No donation data found here</h1>
      </>
    )
  }
  return (
    <>
      <Table striped bordered hover id="admin-org-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Organization Name</th>
            <th>Owner Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {donationList?.length > 0 ? (
            donationList.map((donation, index) => {
              return (
                <tr>
                  <th>No</th>
                  <th>Organization Name</th>
                  <th>Owner Name</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                </tr>
              );
            })
          ) : (
            <tr>
              {" "}
              <td>No Donation data found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default AdminDonationsTable;
