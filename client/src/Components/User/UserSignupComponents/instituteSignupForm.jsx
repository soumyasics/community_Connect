import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "../../../api/BaseUrl.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance.js";
import { validatePincode } from "../../../utils/pincodeValidation.js";
import "./signupForm.css";
const InstituteSignupForm = () => {
  const [instituteData, setInstituteData] = useState({
    name: "",
    yearOfEstablishment: "",
    email: "",
    password: "",
    type: "",
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
    setInstituteData({ ...instituteData, [e.target.name]: e.target.value });
  };
  const handleFilechange = (e) => {
    setInstituteData({ ...instituteData, img: e.target.files[0] });
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
      !instituteData.name ||
      !instituteData.yearOfEstablishment ||
      !instituteData.email ||
      !instituteData.password ||
      !instituteData.type ||
      !instituteData.address ||
      !instituteData.city ||
      !instituteData.state ||
      !instituteData.pincode ||
      !instituteData.phoneNumber ||
      !instituteData.description ||
      !instituteData.license
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        alert("Please agree to the terms and conditions");
        return;
      }
      if (instituteData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      let phoneNumberReg = /^[0-9]{10}$/;
      if (!phoneNumberReg.test(instituteData.phoneNumber)) {
        alert("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(instituteData.email)) {
        alert("Invalid Email id");
        console.log("Invalid email");
        return;
      }

      if (!validatePincode(instituteData.pincode)) {
        alert("Please provide a valid pincode (Trivandrum only)");
        return;
      }

      if (!isValidLicsense(instituteData.license)) {
        console.log("Invalid license number");
        alert("Invalid license number");
        return;
      }
      sendDataToServer(instituteData);
    }
  };
  const sendDataToServer = async (data) => {
    try {
      const response = await axiosMultipartInstance.post(
        "/institute/signup",
        data
      );
      if (response.status === 201) {
        console.log("Institute registration successful");
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
            placeholder="Institute Name"
            name="name"
            onChange={handleChange}
            value={instituteData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your Institute name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Year Of Establishment"
            required
            name="yearOfEstablishment"
            onChange={handleChange}
            value={instituteData.yearOfEstablishment}
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
            value={instituteData.email}
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
            value={instituteData.password}
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
            name="type"
            onChange={handleChange}
            value={instituteData.type}
          >
            <option value="">Institute Type</option>
            <option value="Anganwadis">Anganwadis</option>
            <option value="Schools">Schools</option>
            <option value="College">College</option>
            <option value="Traning centers">Traning centers</option>
            <option value="Other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select type of the Institute.
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
            value={instituteData.phoneNumber}
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
            value={instituteData.address}
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
            value={instituteData.city}
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
            placeholder="Institute License No."
            required
            name="license"
            onChange={handleChange}
            value={instituteData.license}
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digit Institute license number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Pincode"
            required
            name="pincode"
            onChange={handleChange}
            value={instituteData.pincode}
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
          placeholder="Tell us about your Institute"
          rows={3}
          name="description"
          onChange={handleChange}
          value={instituteData.description}
        />
        <Form.Control.Feedback type="invalid">
          Please tell us about your Institute.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload Institute Photos (Square image)</Form.Label>
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
export default InstituteSignupForm;
