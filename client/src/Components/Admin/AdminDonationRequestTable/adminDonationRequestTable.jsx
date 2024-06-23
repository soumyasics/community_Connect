import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Table } from "react-bootstrap";
import DonationTableBody from "./donationTableBody.jsx";
import "./adminDonationRequestTable.css";
const AdminDonationRequestTable = ({ searchUserName }) => {
  const [shopApproveModal, setShowApproveModal] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [allUsersData, setAllUsersData] = useState(null);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);

  const [lastIndex, setLastIndex] = useState(currentPage * recordPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - recordPerPage);

  const [currentPageUsers, setCurrentPageUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(
    [...Array(totalPages + 1).keys()].slice(1)
  );

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    if (usersData?.length > 0) {
      setCurrentPageUsers(usersData?.slice(firstIndex, lastIndex));
      setTotalPages(Math.ceil(usersData.length / recordPerPage));
    } else {
      setCurrentPageUsers(null);
    }
  }, [usersData, firstIndex, lastIndex]);

  useEffect(() => {
    setPageNumbers([...Array(totalPages + 1).keys()].slice(1));
  }, [totalPages]);

  useEffect(() => {
    setLastIndex(currentPage * recordPerPage);
  }, [currentPage]);

  useEffect(() => {
    setFirstIndex(lastIndex - recordPerPage);
  }, [lastIndex]);

  useEffect(() => {
    if (searchUserName.length > 0) {
      const filteredUsers = allUsersData?.filter((request) => {
        return request?.orphanageId?.name
          ?.toLowerCase()
          .includes(searchUserName.toLowerCase());
      });

      setCurrentPage(1);
      setUsersData(filteredUsers);
    } else {
      getAllRequests();
    }
  }, [searchUserName]);

  const getPendingRequests = (allReqs) => {
    const allPendingReqs = allReqs.filter(
      (req) => req.isAdminApproved === "pending"
    );
    return allPendingReqs;
  };
  const getAllRequests = async () => {
    try {
      const res = await axiosInstance.get("donation-request/get-all-requests");
      const allReqs = res?.data?.data;
      if (allReqs.length > 0) {
        const allPendingReqs = getPendingRequests(allReqs);
        setUsersData(allPendingReqs);
        setAllUsersData(allPendingReqs);
      }
    } catch (error) {
      console.log("error on get all donation request", error);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!usersData) {
    return (
      <>
        <h1> Not found any requests.</h1>
      </>
    );
  }
  return (
    <>
      <Table striped bordered hover id="admin-org-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Organization Name</th>
            <th>Request Purpose</th>
            <th>Target Amount</th>
            <th>Contact </th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {currentPageUsers?.length > 0 &&
            currentPageUsers.map((req, index) => {
              return (
                <DonationTableBody
                  index={index}
                  getAllRequests={getAllRequests}
                  req={req}
                  firstIndex={firstIndex}
                  key={req?._id}
                />
              );
            })}
        </tbody>
      </Table>

      {/* pagination buttons here */}
      <nav>
        <ul className="admin-users-table-pagination pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prevPage}>
              Prev
            </a>
          </li>
          {pageNumbers.map((number, i) => {
            return (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCurrentPage(number)}
                >
                  {" "}
                  {number}{" "}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminDonationRequestTable;
