import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import AdminDonationRequestTable from "../AdminDonationRequestTable/adminDonationRequestTable";
import "./adminDonationRequest.css";

const AdminDonationRequests = () => {
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
          <h1 className="admin-users-title"> All Orphanage Requests</h1>
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
              placeholder="Search Orphanages Requests"
        
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </InputGroup>
        </div>

        <div className="mt-5">
          <AdminDonationRequestTable searchUserName={searchedItem} />
        </div>
      </div>
    </>
  );
};
export default AdminDonationRequests;
