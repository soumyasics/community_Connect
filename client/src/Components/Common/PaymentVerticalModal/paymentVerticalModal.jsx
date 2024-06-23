import { useState, useEffect, useContext } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/BaseUrl";
import AuthContext from "../../../Context/authContext";
import PaymentReceipt from "../../User/UserDonationRequest/paymentReceipt";

export default function PaymentVerticalModal(props) {
  const { userContext } = useContext(AuthContext);
  const { id } = useParams();
  const [donationReqData, setDonationReqData] = useState(null);
  const [orphanageId, setOrphanageId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState({
    heading: "Donate",
    subHeading: "",
    content: " ",
  });
  const [userAcDetails, setUserAcDetails] = useState({
    acHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: 0,
  });

  useEffect(() => {
    getDonationReqData();
  }, [id]);

  const collectData = (userBankAcDetails) => {
    if (donationReqData) {
      const orphanageId = donationReqData.orphanageId._id || null;
      const requestId = donationReqData._id || null;
      const donatedAmount = userAcDetails.amount || 0;
      let donatedUserId = null;
      let donatedOrganizationId = null;

      if (userContext?.userType === "user") {
        donatedUserId = userContext?.userData?._id;
      }
      if (userContext?.userType === "organization") {
        donatedOrganizationId = userContext?.userData?._id;
      }

      if (
        orphanageId &&
        requestId &&
        donatedAmount &&
        (donatedUserId || donatedOrganizationId)
      ) {
        const allDonationData = {
          orphanageId,
          requestId,
          donatedAmount,
          donatedUserId,
          donatedOrganizationId,
          accountHolderName: userBankAcDetails.acHolderName,
          cardNumber: userBankAcDetails.cardNumber,
        };

        if (donatedAmount < 0) {
          alert("Donated amount cannot be negative");
          return;
        }

        sendDataToServer(allDonationData);
      } else {
        console.log(
          "donation failed , please login again",
          "orp id",
          orphanageId,
          "req id",
          requestId,
          "donated amt",
          donatedAmount,
          "donated user id",
          donatedUserId,
          "donated org id optionsl",
          donatedOrganizationId
        );
        return;
      }
    } else {
      console.log("Can't get donation request data");
      return;
    }
  };

  useEffect(() => {
    if (donationReqData) {
      setPaymentModalContent({
        heading: `Donate to ${
          donationReqData.orphanageId?.name || "Orphanage"
        }`,
        subHeading: `Amount needed: ${
          donationReqData?.targetAmount -
            donationReqData.totallyCollectedAmount || 1000
        } rupees`,
        content: `Pay ${
          donationReqData?.targetAmount -
            donationReqData.totallyCollectedAmount || 1000
        } rupees to the ${donationReqData?.orphanageId?.name} orphanage`,
      });
    }
  }, [donationReqData]);

  const sendDataToServer = async (allDonationData) => {
    try {
      const res = await axiosInstance.post("/donation/create", allDonationData);
      if (res.status === 201) {
        console.log("res data =>", res.data);
        console.log("res data =>", res.data.data);
        localStorage.setItem("lastDonation", JSON.stringify(res.data.data));
        console.log("res data =>", res.data.donationRequest);
        alert("Donation successfull");
        props.onHide();
        setUserAcDetails({
          acHolderName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
        setValidated(false);
      } else {
        alert("Donation failed");
        console.log("failed respoonse", res);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message;
      if (errMsg) {
        console.log(error.response.data.message);
        alert(errMsg);
      }
    }
  };

  const getDonationReqData = async () => {
    try {
      const res = await axiosInstance.get(
        "donation-request/get-donation-request/" + id
      );
      const data = res?.data?.data || null;

      if (!data) {
        setDonationReqData(null);
        return;
      }
      setDonationReqData(data);
    } catch (err) {
      console.log("err on get individual donation req", err);
    }
  };

  const handleSubmitPayment = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const { acHolderName, cardNumber, expiryDate, cvv } = userAcDetails;
    const checkTypes = () => {
      const convertCardNumber = Number(cardNumber);
      if (isNaN(convertCardNumber)) {
        console.log("Check your card number");
        return false;
      }
      const convertCvv = Number(cvv);
      if (isNaN(convertCvv)) {
        console.log("Check your cvv");
        return false;
      }

      return true;
    };

    if (
      !acHolderName ||
      !cardNumber ||
      !expiryDate ||
      !cvv ||
      cvv.length !== 3 ||
      cardNumber.length < 12
    ) {
      console.log("all fields are mandatory");
      return;
    } else {
      if (checkTypes()) {
        collectData(userAcDetails);
      }
    }
  };

  const handleChange = (e) => {
    setUserAcDetails({
      ...userAcDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {paymentModalContent.heading}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmitPayment}>
        <Modal.Body>
          <p>{paymentModalContent.content}</p>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="acHolderName"
              value={userAcDetails.acHolderName}
              type="text"
              placeholder="Card Holder Name"
              autoFocus
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide card holder name
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  name="cardNumber"
                  value={userAcDetails.cardNumber}
                  type="text"
                  placeholder="Card Number"
                  pattern="[0-9]{12,16}"
                  minLength={12}
                  maxLength={16}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide card number
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  value={userAcDetails.amount}
                  type="number"
                  placeholder="Amount"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter amount
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  value={userAcDetails.expiryDate}
                  name="expiryDate"
                  type="date"
                  pattern="[0-9]{2}/[0-9]{2}"
                  required
                  placeholder="MM/YY"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide expiry date.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  value={userAcDetails.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  name="cvv"
                  pattern="[0-9]{3}"
                  type="text"
                  required
                  minLength={3}
                  maxLength={3}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide CVV
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setUserAcDetails({
                acHolderName: "",
                cardNumber: "",
                expiryDate: "",
                cvv: "",
              });
              // props.onHide();
            }}
          >
            Clear
          </Button>
          <Button type="submit">Donate Now</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
