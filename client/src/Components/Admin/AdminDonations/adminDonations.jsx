import { CiExport } from "react-icons/ci";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav";
import AdminNavbar from "../AdminNavbar/adminNavbar";
import AdminOrgTable from "../AdminOrgTable/adminOrgTable";
import { useState } from "react";
import AdminOrpTable from "../AdminOrpTable/adminOrpTable";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import AdminDonationsTable from "./adminDonationsTable";
import './adminDonations.css';

const AdminDonations = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchedItem, setSearchedItem] = useState("");
    // here used debouncing method for handling search inputs
    let searchTimeout;
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        handleSearch(e.target.value);
      }, 1500);
    };
  
    const handleSearch = (searchInput) => {
      setSearchedItem(searchInput);
    };
  
  return (
    <>
      <div className="admin-users-container">
        <div className="admin-user-title-container">
          <h1 className="admin-users-title"> All Donations</h1>
          {/* <button>
            <CiExport /> &nbsp; Export
          </button> */}
        </div>
        <div className="admin-users-search-container">
          <InputGroup className="mt-5">
            <InputGroup.Text>
              <IoIosSearch />
            </InputGroup.Text>
            <Form.Control
              id="user-search-id"
              placeholder="Search User"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </InputGroup>
        </div>

        <div className="mt-5">
          <AdminDonationsTable />
        </div>
      </div>
    </>
  );
};
export default AdminDonations;
