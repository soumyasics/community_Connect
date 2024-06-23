import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import UserSignupForm from "../../../Components/User/UserSignupComponents/userSignupForm";
import OrphanageSignupForm from "../../../Components/User/UserSignupComponents/orphanageSignupForm";
import OrganizationSignupForm from "../../../Components/User/UserSignupComponents/organizationSignupForm";
import "./userSignup.css";
import InstituteSignupForm from "../../../Components/User/UserSignupComponents/instituteSignupForm";
const UserSignup = () => {
  const [activeUser, setActiveUser] = useState("user");
  const handleUserChange = (event) => {
    setActiveUser(event.target.value);
  };
  return (
    <div id="user-signup-page">
      <UserNavbar />
      <CommunityHeader />
      <Container className="user-signup-container">
        <div className="user-signup-form">
          <div className="user-signup-form-heading">
            {" "}
            <h6>Register</h6>{" "}
          </div>

          <div className="user-signup-input-container">
            <Form.Select
              className="select-active-user"
              defaultValue={activeUser}
              onChange={handleUserChange}
            >
              <option value="user">User</option>
              <option value="orphanage">Orphanage</option>
              <option value="organization">Organization</option>
              <option value="institute">Institute</option>
            </Form.Select>

            <div className="users-signup-form-components">
              {activeUser === "user" && <UserSignupForm />}
              {activeUser === "orphanage" && <OrphanageSignupForm />}
              {activeUser === "organization" && <OrganizationSignupForm />}
              {activeUser === "institute" && <InstituteSignupForm />}
            </div>
          </div>
        </div>
      </Container>
      <UserFooter />
    </div>
  );
};
export default UserSignup;
