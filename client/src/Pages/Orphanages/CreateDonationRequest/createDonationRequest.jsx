import { useEffect, useState } from "react";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import OrphanageRequestForm from "../../../Components/Orphanage/OrphanageRequestForm/orphanageRequestForm";
import { Container } from "react-bootstrap";
import "./createDonationRequest.css";

const CreateDonationRequest = () => {
  const [orpData, setOrpData] = useState(null);
  useEffect(() => {
    let orpData = localStorage.getItem("orphanage-data") || null;
    if (orpData) {
      orpData = JSON.parse(orpData);
      setOrpData(orpData);
    } else {
      console.log("Orp data not found in local storage");
      console.log("Please login");
    }
  }, []);
  return (
    <>
      <OrphanageNavbar />
      <br />
      {orpData ? (
        <OrphanageRequestForm orpData={orpData} />
      ) : (
        <Container style={{ minHeight: "400px" }} fluid className="mt-5 p-0">
          <h1>Please login</h1>
        </Container>
      )}
      <br />
      <br />
      <div className="mt-5 w-100">
        <UserFooter />
      </div>
    </>
  );
};

export default CreateDonationRequest;
