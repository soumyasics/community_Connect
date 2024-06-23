import { useState, useEffect } from "react";
import UserNavbar from "../../Components/User/UserNavbar/userNavbar";
import CommunityHeader from "../../Components/Common/CommunityHeader/CommunityHeader";
import bloodCampImg from "../../Assets/Images/blood-donation-camp.jpg";
import UserFooter from "../../Components/Common/UserFooter/userFooter";
import styles from "./bloodCamp.module.css";
import axiosInstance from "../../api/BaseUrl";
import { Button, Form, Table } from "react-bootstrap";
import AuthContext from "../../Context/authContext";
import { useContext } from "react";
import useUserData from "../../hooks/useUserData.js";

import "./blood-camp.css";
const ViewBloodCamps = () => {
  const [campData, setCampData] = useState([]);
  const [showBookSlot, setShowBookSlot] = useState(false);
  const [isSlotAlreadyBooked, setIsSlotAlreadyBooked] = useState(false);
  const [bookedCampId, setBookedCampId] = useState(null);

  const { getUserData } = useUserData();
  const { userContext } = useContext(AuthContext);

  useEffect(() => {
    if (userContext.userType === "user") {
      setShowBookSlot(true);
      // console.log("use con", userContext.userData.);
      const isAlreadyBooked =
        userContext?.userData?.bloodDonation?.isSlotBookedOrDonated || false;
      if (isAlreadyBooked) {
        setIsSlotAlreadyBooked(true);
      } else {
        setIsSlotAlreadyBooked(false);
      }

      setBookedCampId(
        userContext?.userData?.bloodDonation?.bookedCampId || null
      );
    } else {
      console.log("user type is not user");
    }
  }, [userContext]);

  useEffect(() => {
    getAllCamps();
  }, [userContext]);
  const getAllCamps = () => {
    axiosInstance
      .get("/camp/get-all-camps")
      .then((response) => {
        const camps = response.data.data || [];
        if (camps.length > 0) {
          setCampData(camps);
        } else {
          console.log("camps data not found");
        }
      })
      .catch((error) => {
        console.log("camps data not found", error);
      });
  };
  const handleBookSlot = (campId) => {
    const userId = userContext?.userData?._id;
    if (!userId) {
      console.log("user not logged in");
      return;
    }

    bookCampSlot(campId, userId);
  };
  const bookCampSlot = async (id, userId) => {
    try {
      let res = await axiosInstance.post(`/camp/participate/${id}`, { userId });
      console.log("res camp", res);
      if (res.status === 200) {
        alert("Slot booked successfully");
        getUserData(userId);
      } else if (res.status === 400) {
        console.log("already booked");
      } else {
        console.error("Something wrong", res);
      }
    } catch (error) {
      console.log("error on book slot", error);
    }
  };

  const handleCancelSlot = (campId) => {
    const userId = userContext?.userData?._id;
    if (!userId) {
      console.log("user not logged in");
      return;
    }
    cancelCampSlot(campId, userId);
  };
  const cancelCampSlot = async (id, userId) => {
    try {
      let res = await axiosInstance.post(`/camp/cancel-participation/${id}`, {
        userId,
      });
      console.log("res camp", res);
      if (res.status === 200) {
        alert("Slot cancelled successfully");
        getUserData(userId);
      } else {
        console.error("Something wrong", res);
      }
    } catch (error) {
      console.log("error on book slot", error);
    }
  };
  const isPastDate = (dateString) => {
    const today = new Date();
    const campDate = new Date(dateString);
    return campDate < today;
  };
  return (
    <div>
      <UserNavbar />
      <CommunityHeader heading="" description="" imgPath={bloodCampImg} />
      {campData.length > 0 && (
        <div>
          <h3 className="font-weight-bold text-center mt-5"> Blood Camps </h3>
        </div>
      )}

      <div style={{ width: "90%" }} className="mx-auto">
        {campData.length === 0 && (
          <h3 className="text-center font-weight-bold my-5">
            No Blood Camps Found.
          </h3>
        )}
        {campData.length > 0 && (
          <Table style={{ textAlign: "left" }} striped bordered hover>
            <thead>
              <tr className="text-left">
                <th>No</th>
                <th>Camp Name</th>
                <th>Camp Place </th>
                <th>Camp Date</th>
                <th>Total Registrations</th>
                {showBookSlot && <th>Book Slot</th>}
              </tr>
            </thead>
            <tbody>
              {campData.map((camp, index) => {
                const isCurrentSlotBooked = camp?._id === bookedCampId;
                if (isPastDate(camp.campDate)) {
                  return null;
                }
                return (
                  <tr key={index} className="text-left">
                    <td>{index + 1}</td>
                    <td>{camp.campName}</td>
                    <td>{camp.campPlace}</td>
                    <td>{camp.campDate}</td>
                    <td>{camp.campRegistrations.length}</td>
                    {showBookSlot && (
                      <td>
                        {" "}
                        {isCurrentSlotBooked ? (
                          <Button
                            onClick={() => {
                              handleCancelSlot(camp?._id);
                            }}
                            variant="danger"
                          >
                            Cancel Booking{" "}
                          </Button>
                        ) : isSlotAlreadyBooked ? (
                          <Button className="px-4" disabled={true}>
                            {" "}
                            Not Available
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleBookSlot(camp?._id);
                            }}
                          >
                            {" "}
                            Book Slot
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      <UserFooter />
    </div>
  );
};
export default ViewBloodCamps;
