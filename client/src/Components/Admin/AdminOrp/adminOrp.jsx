import { useState } from "react";
import AdminOrpTable from "../AdminOrpTable/adminOrpTable";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import "./adminOrp.css";
const AdminOrp = () => {
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
          <h1 className="admin-users-title"> All Orphanages</h1>
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
              placeholder="Search Orphanages"
              aria-label="users"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </InputGroup>
        </div>

        <div className="mt-5">
          <AdminOrpTable searchUserName={searchedItem} />
        </div>
      </div>
    </>
  );
};
export default AdminOrp;
