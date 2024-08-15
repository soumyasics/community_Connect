import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance";
import { validatePincode } from "../../../utils/pincodeValidation";

import "./signupForm.css";
const UserSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "Kerala",
    nationality: "India",
    pincode: "",
    img: null,
  });
  // const [userData, setUserData] = useState({
  //   firstName: "arun",
  //   lastName: "s",
  //   email: "ak@gmail.com",
  //   password: "12341234",
  //   gender: "male",
  //   age: "",
  //   phoneNumber: "1234123412",
  //   street: "stre",
  //   city: "ct",
  //   state: "Kerala",
  //   nationality: "India",
  //   pincode: "",
  //   img: null,
  // });
  const [validated, setValidated] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFilechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.gender ||
      !userData.phoneNumber ||
      !userData.age ||
      !userData.street ||
      !userData.city ||
      !userData.state ||
      !userData.pincode ||
      !userData.nationality
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (userData.age < 18) {
        alert("Sorry, User's age must be 18 or above");
        return;
      }
      if (userData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      let phoneNumberReg = /^[0-9]{10}$/;
      if (!phoneNumberReg.test(userData.phoneNumber)) {
        alert("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(userData.email)) {
        alert("Invalid Email Address");
        console.log("Invalid email");
        return;
      }

    

      if (!agreedToTerms) {
        alert("Please agree to the terms and conditions");
        console.log("Not checked");
        return;
      }
      sendDataToServer(userData);
    }
  };

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const redirectLogin = () => {
    navigate("/user/login");
  };
  const sendDataToServer = async (data) => {
    if (userData.password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return;
    }
    try {
      const response = await axiosMultipartInstance.post("/user/signup", data);
      if (response.status === 201) {
        console.log("user created successfully");
        alert("Registration successful.");
        setTimeout(() => {
          navigate("/user/login");
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
  };
  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            value={userData?.firstName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your first name!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="text"
            value={userData?.lastName}
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your lastname.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            as="select"
            type="select"
            name="gender"
            onChange={handleChange}
            value={userData?.gender}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select your gender.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            onChange={handleChange}
            name="age"
            value={userData?.age}
            type="number"
            placeholder="Your age"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your age
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={userData?.email}
            name="email"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              cursor: "pointer",
              position: "absolute",
              top: "25px",
              right: "34px",
              zIndex: "100",
            }}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
          <Form.Control
            required
            type={showPassword ? "text" : "password"}
            minLength={8}
            placeholder="Password"
            className="password-input-eye-btn-hide"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="street"
            onChange={handleChange}
            value={userData.street}
            type="text"
            placeholder="Street"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="city"
            onChange={handleChange}
            value={userData?.city}
            type="text"
            placeholder="City"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your city name.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="pincode"
            onChange={handleChange}
            value={userData?.pincode}
            type="number"
            placeholder="Pincode"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide your pincode.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            type="text"
            minLength={10}
            maxLength={10}
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            value={userData?.phoneNumber}
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">
            Please Enter 10 digits phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload your photo (Square image) </Form.Label>
        <Form.Control
          onChange={handleFilechange}
          type="file"
          name="img"
          accept="image/*"
        />
      </Form.Group>
      <div className="signup-form-flex-div">
        <Form.Group className="mt-3 ms-4">
          <Form.Check
            required
            className="signup-check-box "
            feedbackType="invalid"
            checked={agreedToTerms}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="" className="ms-3">
            Agree to our{" "}
            <span
              className="text-primary"
              onClick={() => {
                navigate("../terms");
              }}
            >
              {" "}
              terms and conditions{" "}
            </span>
          </label>
        </Form.Group>

        <p className="mt-3">
          {" "}
          Already have an account?{" "}
          <span className="redirect-login" onClick={redirectLogin}>
            Login
          </span>{" "}
        </p>
      </div>

      <div className="signup-form-flex-div">
        <Button id="user-signup-btn" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
export default UserSignupForm;
