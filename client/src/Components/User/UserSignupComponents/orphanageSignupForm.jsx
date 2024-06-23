import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "../../../api/BaseUrl.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance.js";
import { validatePincode } from "../../../utils/pincodeValidation.js";
const OrphanageSignupForm = () => {
  const [orphanageData, setOrphanageData] = useState({
    name: "",
    yearOfEstablishment: "",
    email: "",
    password: "",
    purpose: "",
    address: "",
    city: "",
    state: "Kerala",
    license: "",
    pincode: "",
    phoneNumber: "",
    description: "",
    img: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  // form validation
  const handleChange = (e) => {
    setOrphanageData({ ...orphanageData, [e.target.name]: e.target.value });
  };
  const handleFilechange = (e) => {
    setOrphanageData({ ...orphanageData, img: e.target.files[0] });
  };
  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidLicsense(num) {
    const licenseReg = /^[0-9]{10}$/;
    return licenseReg.test(num);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
      !orphanageData.name ||
      !orphanageData.yearOfEstablishment ||
      !orphanageData.email ||
      !orphanageData.password ||
      !orphanageData.purpose ||
      !orphanageData.address ||
      !orphanageData.city ||
      !orphanageData.state ||
      !orphanageData.pincode ||
      !orphanageData.phoneNumber ||
      !orphanageData.description ||
      !orphanageData.license
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        alert("Please agree to the terms and conditions");
        return;
      }
      if (orphanageData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      let phoneNumberReg = /^[0-9]{10}$/;
      if (!phoneNumberReg.test(orphanageData.phoneNumber)) {
        alert("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(orphanageData.email)) {
        alert ("Invalid Email id")
        console.log("Invalid email");
        return;
      }

      if (!validatePincode(orphanageData.pincode)) {
        alert("Please provide a valid pincode (Trivandrum only)");
        return;
      }

      if (!isValidLicsense(orphanageData.license)) {
        console.log("Invalid license number");
        alert("Invalid license number");
        return;
      }
      sendDataToServer(orphanageData);
    }
  };
  const sendDataToServer = async (data) => {
    try {
      const response = await axiosMultipartInstance.post(
        "/orphanage/signup",
        data
      );
      if (response.status === 201) {
        console.log("orphange registratio successful");
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
            placeholder="Orphanage Name"
            name="name"
            onChange={handleChange}
            value={orphanageData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your orphanage name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Year Of Establishment"
            required
            name="yearOfEstablishment"
            onChange={handleChange}
            value={orphanageData.yearOfEstablishment}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your established year
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={orphanageData.email}
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
            name="password"
            className="password-input-eye-btn-hide"
            onChange={handleChange}
            value={orphanageData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
          <Form.Control.Feedback>
            Your password is strong.
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            as="select"
            type="select"
            name="purpose"
            onChange={handleChange}
            value={orphanageData.purpose}
          >
            <option value="">Purpose of your orphanage</option>
            <option value="Children Education">Children Education</option>
            <option value="Old Age Home">Old Age Home</option>
            <option value="Other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select purpose of the orphanage.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            required
            name="phoneNumber"
            minLength={10}
            onChange={handleChange}
            value={orphanageData.phoneNumber}
            pattern="[0-9]{10}"
            maxLength={10}
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digits phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Address"
            required
            name="address"
            onChange={handleChange}
            value={orphanageData.address}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="City"
            required
            name="city"
            onChange={handleChange}
            value={orphanageData.city}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your city name.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Orphanage License No."
            required
            name="license"
            onChange={handleChange}
            value={orphanageData.license}
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digit orphanage license number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Pincode"
            required
            name="pincode"
            onChange={handleChange}
            value={orphanageData.pincode}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your pincode.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          required
          as="textarea"
          placeholder="Tell us about your orphanage"
          rows={3}
          name="description"
          onChange={handleChange}
          value={orphanageData.description}
        />
        <Form.Control.Feedback type="invalid">
          Please tell us about your orphanage.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload Orphanage Photos (Square image)</Form.Label>
        <Form.Control
          accept="image/*"
          onChange={handleFilechange}
          type="file"
          name="img"
        />
      </Form.Group>
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

      <div className="signup-form-flex-div">
        <Button id="user-signup-btn" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
export default OrphanageSignupForm;
