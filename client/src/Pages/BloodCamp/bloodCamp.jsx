import { useState, useEffect } from "react";
import UserNavbar from "../../Components/User/UserNavbar/userNavbar";
import CommunityHeader from "../../Components/Common/CommunityHeader/CommunityHeader";
import bloodCamp from "../../Assets/Images/blood-donation-camp.jpg";
import UserFooter from "../../Components/Common/UserFooter/userFooter";
import styles from "./bloodCamp.module.css";
import axiosInstance from "../../api/BaseUrl";
import { Button, Form } from "react-bootstrap";
import AuthContext from "../../Context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./blood-camp.css";

const BloodCamp = () => {
  const [validated, setValidated] = useState(false);
  const [campName, setCampName] = useState("");
  const [campPlace, setCampPlace] = useState("");
  const [campDate, setCampDate] = useState("");
  const [campCapacity, setCampCapacity] = useState("");
  const [orgId, setOrgId] = useState("");
  const { userContext } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.userData) {
      setOrgId(userContext.userData._id);
    }
  }, [userContext]);

  console.log("orgi d", orgId);
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "campName") {
      setCampName(value);
    } else if (name === "campPlace") {
      setCampPlace(value);
    } else if (name === "campDate") {
      setCampDate(value);
    } else if (name === "campCapacity") {
      setCampCapacity(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(campCapacity, campDate, campName, campPlace);
    if (!campCapacity || !campDate || !campName || !campPlace) {
      console.log("Please fill all the fields");
    } else {
      console.log("Thank you for registering with us");
      sendDataToServer();
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const resetData = () => {
    setCampName("");
    setCampPlace("");
    setCampDate("");
    setCampCapacity("");
  };

  const sendDataToServer = async () => {
    const campData = {
      campName: campName,
      campPlace: campPlace,
      campDate: campDate,
      campCapacity: campCapacity,
      ownerId: orgId,
    };
    try {
      const res = await axiosInstance.post("/camp/create", campData);

      if (res.status === 200) {
        alert("Camp created successfully");
        resetData();
        navigate("/view-blood-camps");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <UserNavbar />
      <CommunityHeader heading="" description="" imgPath={bloodCamp} />
      <div>
        <h3 className="font-weight-bold text-center mt-5">
          {" "}
          Blood Camp Registration
        </h3>
        <Form
          noValidate
          validated={validated}
          className="w-50 px-3 mx-auto mb-5"
          onSubmit={handleSubmit}
          id="camp-reg-form"
        >
          <Form.Group>
            <Form.Control
              className="user-login-input"
              type="text"
              onChange={handleChanges}
              placeholder="Camp Name"
              required
              name="campName"
              value={campName}
            />
            <Form.Control.Feedback type="invalid">
              Please provide camp name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              className="user-login-input"
              type="text"
              placeholder="Camp conducting place"
              name="campPlace"
              onChange={handleChanges}
              value={campPlace}
            />
            <Form.Control.Feedback type="invalid">
              Please provide camp place.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              className="user-login-input"
              type="date"
              placeholder="Date"
              name="campDate"
              onChange={handleChanges}
              value={campDate}
            />
            <Form.Control.Feedback type="invalid">
              Please provide camp date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              className="user-login-input"
              type="number"
              pattern="[0-9]*"
              placeholder="Camp Capacity"
              name="campCapacity"
              onChange={handleChanges}
              value={campCapacity}
            />
            <Form.Control.Feedback type="invalid">
              Please provide camp capacity.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justicy-content-center">
            <Button className="user-login-btn mx-auto" type="submit">
              Register Camp
            </Button>
          </div>
        </Form>
      </div>
      <UserFooter />
    </div>
  );
};
export default BloodCamp;
