import { useEffect, useState } from "react";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import { Container } from "react-bootstrap";
import InstituteNavbar from "../../../Components/Institutes/InstitutesNavbar/instituteNavbar";
import InsRequestForm from "../../../Components/Institutes/InstituteRequestForm/instituteRequestForm";
import "./createDonationRequest.css";
const InsCreateDonationRequest = () => {
  const [insData, setInsData] = useState(null);
  useEffect(() => {
    let insData = localStorage.getItem("institute-data") || null;
    if (insData) {
      insData = JSON.parse(insData);
      setInsData(insData);
    } else {
      console.log("Institute data not found in local storage");
      console.log("Please login");
    }
  }, []);
  return (
    <>
      <InstituteNavbar />
      <br />
      {insData ? (
        <InsRequestForm insData={insData} />
      ) : (
        <Container style={{ minHeight: "400px" }} fluid className="mt-5 p-0">
          <h1>Please login</h1>
        </Container>
      )}

      <div className="mt-5 w-100" style={{ height: "50px" }}></div>
      <div className="mt-5 w-100">
        <UserFooter />
      </div>
    </>
  );
};

export default InsCreateDonationRequest;
