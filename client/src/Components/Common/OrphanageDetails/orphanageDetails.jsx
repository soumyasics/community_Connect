import UserNavbar from "../../User/UserNavbar/userNavbar";
import CommunityHeader from "../CommunityHeader/CommunityHeader";
import UserFooter from "../UserFooter/userFooter";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { Row, Col, Button } from "react-bootstrap";
import "./orphanageDetails.css";
import OrphanageNavbar from "../../Orphanage/OrphanageNavbar/orphanageNavbar";
import { useContext } from "react";
import AuthContext from "../../../Context/authContext";
import BASE_URL from "../../../api/Backend-url";

const OrphanageDetails = () => {
  const { userContext } = useContext(AuthContext);
  const [orphanageData, setOrphanageData] = useState(null);
  const { id } = useParams();
  const [activeUser, setActiveUser] = useState(null);
  const [displayPicture, setDisplayPicture] = useState(
    "https://img.freepik.com/free-vector/orphanage-concept-illustration_114360-8721.jpg"
  );
  useEffect(() => {
    getOrphanageData();
  }, []);

  useEffect(() => {
    const userType = userContext?.userType || "";
    setActiveUser(userType);
  }, [userContext]);

  const renderNavbar = () => {
    switch (activeUser) {
      case "orphanage":
        return <OrphanageNavbar />;
      default:
        return <UserNavbar />;
    }
  };

  const getOrphanageData = async () => {
    try {
      const res = await axiosInstance.get(
        "/orphanage/get-orphanage-by-id/" + id
      );
      const orpData = res?.data?.data;
      if (orpData) {
        setOrphanageData(orpData);
      } else {
        alert("Orphanage data not found");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (orphanageData) {
      const imgPath = orphanageData?.img?.filename || null;
      if (imgPath) {
        setDisplayPicture(BASE_URL + imgPath);
      }
    }
  }, [orphanageData]);
  return (
    <div>
      {renderNavbar()}
      <CommunityHeader />
      <div className="single-orp-container">
        <div className="single-orp-img-container w-50">
          <img
            style={{ maxWidth: "400px" }}
            src={displayPicture}
            alt="orphanage"
          />
        </div>
        <div className="single-orp-text-container">
          <h2> {orphanageData?.name} </h2>
          <p className="orp-description"> {orphanageData?.description}</p>
          <Col> Started Year: {orphanageData?.yearOfEstablishment}</Col>
          <Row>
            <Col> Phone Number: {orphanageData?.phoneNumber}</Col>
            <Col> Email Id: {orphanageData?.email}</Col>
          </Row>
          <Row>
            <Col> Orphanage Address: {orphanageData?.address}</Col>
          </Row>
          <Row>
            <Col> Orphanage City: {orphanageData?.city}</Col>
            <Col> Pincode: {orphanageData?.pincode}</Col>
          </Row>
          <Row>
            <Col> Our Purpose: {orphanageData?.purpose}</Col>
          </Row>

          <Row>
            {/* <Button className="orp-requests-btn"> View Requests </Button>  */}
          </Row>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};
export default OrphanageDetails;
