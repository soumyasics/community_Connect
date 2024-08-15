import { Form, Button, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/BaseUrl";
import "./forgot.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import UserFooter from "../../../Components/Common/UserFooter/userFooter.jsx";
import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar";
import childrensImg from "../../../Assets/Images/childrens.jpg";
import { useParams } from "react-router-dom";
export const UserForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
    const {userType} = useParams();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPass(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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

    if (!email || !password || !confirmPass) {
      alert("Please fill all the fields");
      return;
    }

    if (password.length < 8) {
      alert("New Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match. Please make sure both passwords are identical.");
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
    try {
      const res = await axiosInstance.post(`${userType}/forgot-password`, {
        email,
        password,
      });

      if (res.status === 200) {
        alert("Password changed successfully.");
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        alert(error?.response?.data?.message);
      } else {
        alert(error.message);
      }
    }
  };
  return (
    <>
      <UserNavbar />
      <CommunityHeader
        imgPath={childrensImg}
        heading="Give. Love. Repeat"
        description=""
        textColor="#a82927"
      />
      {/* <div className="text-center mt-3">
        <h3> Reset your password</h3>
      </div> */}

      <Container
        id="all-login-form-container"
        className="all-login-form-containers"
      >
        <Container className="user-login-btn-container">
          <button className="active "> Reset your password</button>
        </Container>
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
              placeholder="New Password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter atleast 8 characters.
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
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            <Form.Control
              required
              className="user-login-input password-input-eye-btn-hide"
              type={showConfirmPassword ? "text" : "password"}
              minLength={8}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleConfirmPasswordChange}
              value={confirmPass}
            />
            {/* <Form.Control.Feedback type="invalid">
              Provide 
            </Form.Control.Feedback> */}
          </Form.Group>
          <div className="user-login-btn-container-2">
            <Button className="user-login-btn" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </Container>

      <UserFooter />
    </>
  );
};
