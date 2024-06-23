import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosMultipartInstance from "../../../api/axiosMultipartInstance";
import "./signupForm.css";
import { validatePincode } from "../../../utils/pincodeValidation";
const OrganizationSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [orgData, setOrgData] = useState({
    name: "",
    ownerName: "",
    email: "",
    password: "",
    address: "",
    state: "Kerala",
    license: "",
    pincode: "",
    phoneNumber: "",
    img: null,
  });
  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleFilechange = (e) => {
    setOrgData({ ...orgData, img: e.target.files[0] });
  };
  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidCin(cin) {
    const cinRegex = /^[A-Z0-9]{21}$/;
    return cinRegex.test(cin);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (
      !orgData.name ||
      !orgData.ownerName ||
      !orgData.email ||
      !orgData.password ||
      !orgData.address ||
      !orgData.state ||
      !orgData.license ||
      !orgData.pincode ||
      !orgData.phoneNumber
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        alert("Please agree to the terms and conditions");
        return;
      }
      if (orgData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }

      let phoneNumberReg = /^[0-9]{10}$/;
      if (!phoneNumberReg.test(orgData.phoneNumber)) {
        alert("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(orgData.email)) {
        alert("Invalid email id");
        console.log("Invalid email");
        return;
      }

      if (!isValidCin(orgData.license)) {
        console.log("Invalid CIN", orgData.license);
        return;
      }
   
      sendDataToServer(orgData);
    }
  };
  const sendDataToServer = async (orgData) => {
    try {
      const response = await axiosMultipartInstance.post(
        "organization/signup",
        orgData
      );
      if (response.status === 201) {
        console.log("organization registration successful");
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
            placeholder="Organization Name"
            name="name"
            onChange={handleChange}
            value={orgData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your organization name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Owner Name"
            required
            name="ownerName"
            onChange={handleChange}
            value={orgData.ownerName}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Owner Name
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
            value={orgData.email}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          style={{
            position: "relative",
          }}
        >
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
            className="password-input-eye-btn-hide"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={orgData.password}
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
            type="text"
            placeholder="Address"
            required
            name="address"
            minLength={3}
            onChange={handleChange}
            value={orgData.address}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            required
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="Phone Number"
            onChange={handleChange}
            value={orgData.phoneNumber}
            name="phoneNumber"
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digit Phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Organization CIN Number"
            required
            name="license"
            onChange={handleChange}
            value={orgData.license}
            minLength={21}
            maxLength={21}
            pattern="[A-Z0-9]{21}"
          />
          <Form.Control.Feedback type="invalid">
            Please provide CIN Number - 21 letters (Capital) and numbers.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            required
            minLength={6}
            maxLength={6}
            pattern="[0-9]{6}"
            placeholder="Pincode"
            name="pincode"
            onChange={handleChange}
            value={orgData.pincode}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your pincode.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload your photo (Square image)</Form.Label>
        <Form.Control
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFilechange}
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
export default OrganizationSignupForm;
