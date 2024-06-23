import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import AdminCampTable from "../AdminCampTable/adminCampTable";
import "./adminCamp.css";
const AdminCamp = () => {
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
          <h1 className="admin-users-title"> All Camps</h1>
          {/* <button>
            <CiExport /> &nbsp; Export
          </button> */}
        </div>

        <div className="mt-5">
          <AdminCampTable searchUserName={searchedItem} />
        </div>
      </div>
    </>
  );
};
export default AdminCamp;
