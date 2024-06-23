import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Table } from "react-bootstrap";
import "./adminOrpTable.css";

const AdminOrpTable = ({ searchUserName }) => {
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
    getAllUsers();
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
      const filteredUsers = allUsersData?.filter((user) => {
        return user?.name?.toLowerCase().includes(searchUserName.toLowerCase());
      });

      setCurrentPage(1);
      setUsersData(filteredUsers);
    } else {
      getAllUsers();
    }
  }, [searchUserName]);

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("orphanage/get-all-orphanages");
      const allUsers = res?.data?.data;
      if (allUsers.length > 0) {
        setUsersData(allUsers);
        setAllUsersData(allUsers);
      }
    } catch (error) {
      console.log("error on get all orphnages", error);
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

  return (
    <>
      <Table striped bordered hover id="admin-orp-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Orphanage Name</th>
            <th>Address</th>
            <th>Year Of Establishment</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentPageUsers?.length > 0 ? (
            currentPageUsers.map((user, index) => {
              return (
                <tr key={user?._id}>
                  <td>{index + firstIndex + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.address}</td>
                  <td>{user?.yearOfEstablishment}</td>
                  <td>{user?.phoneNumber}</td>
                  <td>{user?.email}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              {" "}
              <td>No Users Found</td>
            </tr>
          )}
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
export default AdminOrpTable;
