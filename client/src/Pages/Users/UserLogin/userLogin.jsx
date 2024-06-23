import { Container, Form, Button } from "react-bootstrap";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar.jsx";
import { useState } from "react";
import UserLoginForm from "./userLoginForm.jsx";
import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader.jsx";
import UserFooter from "../../../Components/Common/UserFooter/userFooter.jsx";
import childrensImg from "../../../Assets/Images/childrens.jpg";
import "./userLogin.css";
const UserLogin = () => {
  const [activeUser, setActiveUser] = useState("user");

  return (
    <>
      <UserNavbar />
      <CommunityHeader
        imgPath={childrensImg}
        heading="Give. Love. Repeat"
        description=""
        textColor="#a82927"
      />
      <div className="text-center mt-3">
        <h3> Log in to Community connect</h3>
      </div>

      <Container
        id="all-login-form-container"
        className="all-login-form-containers"
      >
        <Container className="user-login-btn-container">
          <button
            className={`${activeUser === "user" && "active"}`}
            onClick={() => setActiveUser("user")}
          >
            User
          </button>
          <button
            className={`${activeUser === "organization" && "active"}`}
            onClick={() => setActiveUser("organization")}
          >
            {" "}
            Organization
          </button>
          <button
            className={`${activeUser === "orphanage" && "active"}`}
            onClick={() => setActiveUser("orphanage")}
          >
            Orphanage
          </button>
          <button
            className={`${activeUser === "institute" && "active"}`}
            onClick={() => setActiveUser("institute")}
          >
            Institute
          </button>
        </Container>
        <div>
          {activeUser === "user" && <UserLoginForm user={"user"} />}
          {activeUser === "orphanage" && <UserLoginForm user={"orphanage"} />}
          {activeUser === "organization" && (
            <UserLoginForm user={"organization"} />
          )}
          {activeUser === "institute" && (
            <UserLoginForm user={"institute"} />
          )}
        </div>
      </Container>
      <UserFooter />
    </>
  );
};
export default UserLogin;
