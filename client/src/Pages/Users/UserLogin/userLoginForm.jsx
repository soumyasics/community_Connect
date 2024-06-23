import { Form, Button, Col, InputGroup, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/BaseUrl";
import AuthContext from "../../../Context/authContext";
import "./userLogin.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const UserLoginForm = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUserContext, logoutUserContext, userContext } =
    useContext(AuthContext);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // removing localstorage data before login, one time a single user can access this app
  const removeLSData = () => {
    if (localStorage.getItem("user-data")) {
      localStorage.removeItem("user-data");
    }
    if (localStorage.getItem("orphanage-data")) {
      localStorage.removeItem("orphanage-data");
    }
    if (localStorage.getItem("organization-data")) {
      localStorage.removeItem("organization-data");
    }
    if (localStorage.getItem("institute-data")) {
      localStorage.removeItem("institute-data");
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (!email || !password) {
      console.log("Please fill all the fields");
      return;
    }

    if (password.length < 8) {
      alert("Invalid password");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email");
      console.log("Invalid email");
      return;
    }
    sendDataToServer(email, password);
  };

  const sendDataToServer = async (email, password) => {
    if (
      user === "user" ||
      user === "orphanage" ||
      user === "organization" ||
      user === "institute"
    ) {
      try {
        const res = await axiosInstance.post(`/${user}/login`, {
          email,
          password,
        });

        if (res.status === 200) {
          alert("Login successful.");
          removeLSData();
          if (user === "orphanage") {
            const orpDataFromServer = res?.data?.data;

            if (orpDataFromServer) {
              if (orpDataFromServer.password) {
                delete orpDataFromServer.password;
              }

              loginUserContext("orphanage", orpDataFromServer);
              localStorage.setItem(
                "orphanage-data",
                JSON.stringify(orpDataFromServer)
              );
            } else {
              console.log(
                "Orphanage data is not saved in local storage",
                orpDataFromServer
              );
            }
          } else if (user === "institute") {
            const instituteDataFromServer = res?.data?.data;
            if (instituteDataFromServer) {
              if (instituteDataFromServer.password) {
                delete instituteDataFromServer.password;
              }
              loginUserContext("institute", instituteDataFromServer);
              localStorage.setItem(
                "institute-data",
                JSON.stringify(instituteDataFromServer)
              );
            } else {
              console.log(
                "Institute data is not saved in local storage",
                instituteDataFromServer
              );
            }
          } else if (user === "user") {
            const userDataFromServer = res?.data?.data;
            if (userDataFromServer) {
              if (userDataFromServer.password) {
                delete userDataFromServer.password;
              }
              loginUserContext("user", userDataFromServer);
              localStorage.setItem(
                "user-data",
                JSON.stringify(userDataFromServer)
              );
            } else {
              console.log(
                "User data is not saved in local storage",
                userDataFromServer
              );
            }
          } else if (user === "organization") {
            const orgDataFromServer = res?.data?.data;
            if (orgDataFromServer) {
              if (orgDataFromServer.password) {
                delete orgDataFromServer.password;
              }
              loginUserContext("organization", orgDataFromServer);
              localStorage.setItem(
                "organization-data",
                JSON.stringify(orgDataFromServer)
              );
            } else {
              console.log(
                "Organization data is not saved in local storage",
                orgDataFromServer
              );
            }
          } else {
          }

          // created a delay for showing alert message
          setTimeout(() => {
            if (user === "orphanage") {
              navigate("/orphanage");
            } else if (user === "institute") {
              navigate("/institute");
            } else if (user === "user") {
              navigate("/");
            } else if (user === "organization") {
              navigate("/");
            } else {
              alert("Some issues.");
            }
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
      }
    } else {
      console.log("user is different");
      return;
    }
  };
  const redirectUserSignup = () => {
    navigate("/user/signup");
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="user-login-input"
          type="email"
          onChange={handleEmailChange}
          placeholder="Email"
          required
          name="email"
          value={email}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-block",
            cursor: "pointer",
            position: "absolute",
            top: "7px",
            right: "75px",
          }}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
        <Form.Control
          required
          className="user-login-input password-input-eye-btn-hide"
          type={showPassword ? "text" : "password"}
          minLength={8}
          placeholder="Password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <Form.Control.Feedback type="invalid">
          Please Enter atleast 8 characters.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="user-login-btn-container-2">
        <p>
          Don’t have an account?{" "}
          <span className="user-forgot-password" onClick={redirectUserSignup}>
            {" "}
            Sign Up{" "}
          </span>
        </p>
        <br />

        <Button className="user-login-btn" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};
export default UserLoginForm;
