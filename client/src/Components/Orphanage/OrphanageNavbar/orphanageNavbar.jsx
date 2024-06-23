import { useContext, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import { CgProfile } from "react-icons/cg";
import LoginModal from "../../Common/LoginModal/loginModal";
import BASE_URL from "../../../api/Backend-url";
import ccLogo from "../../../Assets/Images/cc-logo.jpg";
import "./orphanageNavbar.css";
const OrphanageNavbar = () => {
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
    const orpData = JSON.parse(localStorage.getItem("orphanage-data")) || null;
    if (orpData) {
      loginUserContext("orphanage", orpData);
    }
  }, []);

  const redirectUserLogin = () => {
    navigate("/user/login");
  };

  const navigateHome = () => {
    navigate("/orphanage");
  };

  const handleLogout = () => {
    if (localStorage.getItem("user-data")) {
      localStorage.removeItem("user-data");
    }
    if (localStorage.getItem("orphanage-data")) {
      localStorage.removeItem("orphanage-data");
    }
    if (localStorage.getItem("organization-data")) {
      localStorage.removeItem("organization-data");
    }

    logoutUserContext();
    navigate("/user/login");
  };

  const handleRedirectOrpList = () => {
    if (userContext && userContext.userType) {
      navigate("/orphanage/orphanages-list");
    } else {
      setLoginModalShow(true);
    }
  };
  const handleRedirectRequest = () => {
    if (userContext && userContext.userType) {
      navigate("/orphanage/donation-request");
    } else {
      setLoginModalShow(true);
    }
  };
  const redirectProfile = () => {
    if (userContext && userContext.userType === "orphanage") {
      navigate("/orphanage/profile");
    } else {
      setLoginModalShow(true);
    }
  };

  const redirectView = () => {
    if (userContext && userContext.userType) {
      navigate("../orphanage/view-requests");
    } else {
      setLoginModalShow(true);
    }
  };
  return (
    <>
      <Container fluid className="user-navbar-container">
        <div
          className="user-navbar-left d-flex justify-content-start align-items-center"
          onClick={navigateHome}
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
          <Link to="/orphanage">Home</Link>
          <button
            className="border-0 text-light bg-transparent"
            onClick={handleRedirectOrpList}
          >
            Orphanages
          </button>
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
                <button onClick={redirectProfile}>
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
export default OrphanageNavbar;
