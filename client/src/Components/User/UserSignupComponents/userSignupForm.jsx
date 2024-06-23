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
  let tvmPincodes = [
    695614, 695102, 695607, 695102, 695606, 695306, 695029, 695584, 695309,
    695023, 695101, 695103, 695103, 695310, 695305, 695008, 695609, 695024,
    695301, 695601, 695615, 695587, 695142, 695011, 695304, 695301, 695104,
    695311, 695310, 695310, 695004, 695310, 695103, 695584, 695141, 695306,
    695307, 695024, 695606, 695605, 695608, 695609, 695104, 695301, 695311,
    695605, 695021, 695583, 695606, 695581, 695304, 695584, 695608, 695144,
    695582, 695306, 695584, 695601, 695601, 695104, 695608, 695612, 695584,
    695604, 695607, 695615, 695606, 695313, 695144, 695583, 695104, 695608,
    695615, 695602, 695602, 695611, 695313, 695015, 695603, 695306, 695312,
    695004, 695610, 695144, 695615, 695609, 695604, 695103, 695304, 695607,
    695614, 695302, 695146, 695610, 695025, 695145, 695609, 695601, 695015,
    695603, 695102, 695307, 695610, 695606, 695589, 695306, 695602, 695311,
    695104, 695604, 695143, 695607, 695146, 695024, 695604, 695316, 695586,
    695145, 695028, 695581, 695609, 695603, 695104, 695004, 695601, 695601,
    695303, 695102, 695305, 695607, 695033, 695103, 695601, 695309, 695584,
    695588, 695011, 695033, 695612, 695604, 695607, 695311, 695601, 695303,
    695586, 695605, 695585, 695589, 695305, 695141, 695017, 695145, 695586,
    695581, 695612, 695614, 695001, 695007, 695036, 695016, 695023, 695022,
    695011, 695024, 695034, 695001, 695143, 695317, 695008, 695605, 695581,
    695011, 695021, 695011, 695143, 695308, 695008, 695021, 695008, 695606,
    695035, 695035, 695102, 695141, 695141, 695028, 695601, 695607, 695615,
    695607, 695028, 695311, 695318, 695603, 695312, 695033, 695572, 695122,
    695005, 695026, 695572, 695505, 695541, 695551, 695124, 695123, 695032,
    695122, 695525, 695564, 695126, 695542, 695009, 695502, 695501, 695501,
    695551, 695522, 695122, 695542, 695564, 695132, 695504, 695013, 695502,
    695551, 695501, 695541, 695014, 695563, 695125, 695503, 695562, 695504,
    695562, 695563, 695563, 695019, 695561, 695014, 695040, 695506, 695551,
    695043, 695574, 695042, 695512, 695525, 695524, 695030, 695504, 695564,
    695002, 695505, 695562, 695541, 695506, 695002, 695501, 695572, 695572,
    695003, 695003, 695526, 695124, 695099, 695523, 695563, 695013, 695123,
    695542, 695571, 695568, 695505, 695124, 695542, 695521, 695574, 695501,
    695527, 695527, 695043, 695505, 695505, 695542, 695504, 695572, 695543,
    695505, 695574, 695512, 695526, 695570, 695571, 695571, 695009, 695505,
    695541, 695125, 695503, 695013, 695125, 695541, 695542, 695124, 695122,
    695551, 695505, 695542, 695562, 695551, 695543, 695573, 695043, 695543,
    695521, 695133, 695543, 695523, 695572, 695528, 695541, 695524, 695523,
    695020, 695013, 695572, 695121, 695121, 695133, 695020, 695507, 695125,
    695562, 695027, 695020, 695562, 695505, 695542, 695563, 695568, 695568,
    695561, 695575, 695572, 695018, 695542, 695551, 695502, 695508, 695541,
    695574, 695501, 695561, 695551, 695562, 695563, 695573, 695124, 695126,
    695005, 695573, 695122, 695551, 695012, 695012, 695026, 695575, 695561,
    695125, 695513, 695020, 695038, 695573, 695526, 695575, 695526, 695541,
    695525, 695501, 695010, 695012, 695123, 695505, 695563, 695027, 695541,
    695014, 695006, 695133, 695010, 695506, 695543, 695547, 695006, 695562,
    695132, 695013, 695125, 695501, 695572, 695512, 695543, 695543, 695505,
    695522, 695523, 695506, 695123, 695573, 695542, 695551, 695521, 695134,
  ];

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
