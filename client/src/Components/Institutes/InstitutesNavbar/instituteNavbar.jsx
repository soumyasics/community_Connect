import { useContext, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import { CgProfile } from "react-icons/cg";
import LoginModal from "../../Common/LoginModal/loginModal";
import BASE_URL from "../../../api/Backend-url";
import ccLogo from "../../../Assets/Images/cc-logo.jpg";
import "./instituteNavbar.css";
const InstituteNavbar = () => {
  const { logoutUserContext, userContext, loginUserContext } =
    useContext(AuthContext);
  const [orpProfilePic, setOrpProfilePic] = useState(null);
  const [orpName, setOrpName] = useState(null);

  const [loginModalShow, setLoginModalShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("orp user cont", userContext);
    let pathname = userContext?.userData?.img?.filename || null;
    if (pathname) {
      setOrpProfilePic(`${BASE_URL}${pathname}`);
    }
    let username2 = userContext?.userData?.name || "Profile";
    console.log("user name", username2);
    setOrpName(username2);
  }, [userContext]);

  useEffect(() => {
    const insData = JSON.parse(localStorage.getItem("institute-data")) || null;
    if (insData) {
      loginUserContext("institute", insData);
    }
  }, []);

  const redirectUserLogin = () => {
    navigate("/user/login");
  };

  const navigateHome = () => {
    navigate("/institute");
  };

  const handleRedirectOrpList = () => {
    if (userContext && userContext.userType) {
      // navigate("/orphanage/orphanages-list");
    } else {
      setLoginModalShow(true);
    }
  };
  const handleRedirectRequest = () => {
    if (userContext && userContext.userType) {
      navigate("/institute/donation-request");
    } else {
      setLoginModalShow(true);
    }
  };
  const redirectProfile = () => {
    if (userContext && userContext.userType === "institute") {
      navigate("/institute/profile");
    } else {
      setLoginModalShow(true);
    }
  };

  const redirectView = () => {
    if (userContext && userContext.userType) {
      navigate("/institute/view-requests");
    } else {
      setLoginModalShow(true);
    }
  };
  return (
    <>
      <Container fluid className="user-navbar-container">
        

        <div
          className="user-navbar-left d-flex justify-content-start align-items-center"
          onClick={() => navigate("/institute")}
        >
          <img
            src={ccLogo}
            alt="cc-logo"
            style={{ width: "50px", borderRadius: "50%" }}
          />
          <p className="ml-4" style={{ cursor: "pointer" }}>
            {" "}
            COMMUNITY CONNECT
          </p>
        </div>

        <div className="user-navbar-center">
          <Link to="/institute">Home</Link>
          {/* <button
            className="border-0 text-light bg-transparent"
            onClick={handleRedirectOrpList}
          >
            Institutes
          </button> */}
          <button
            className="border-0 text-light bg-transparent"
            onClick={handleRedirectRequest}
          >
            Request
          </button>
          <button
            className="border-0 text-light bg-transparent"
            onClick={redirectView}
          >
            View
          </button>
        </div>
        <div className="user-navbar-right">
          {userContext?.userType ? (
            <div>
              {orpProfilePic ? (
                <div onClick={redirectProfile}>
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    className="mr-3"
                    src={orpProfilePic}
                    alt="profile"
                  />
                  {orpName}
                </div>
              ) : (
                <button
                  style={{ color: "white", backgroundColor: "#2b0637" }}
                  onClick={redirectProfile}
                >
                  {" "}
                  <CgProfile /> {orpName}{" "}
                </button>
              )}
            </div>
          ) : (
            <button onClick={redirectUserLogin}>Login</button>
          )}
        </div>
      </Container>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </>
  );
};
export default InstituteNavbar;
