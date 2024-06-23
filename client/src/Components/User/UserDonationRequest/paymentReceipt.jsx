import { useEffect, useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";

const PaymentReceipt = (props) => {
  let paymentData = JSON.parse(localStorage.getItem("lastDonation")) || null;

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="payment-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex align-items-center">
            <FcOk />
            <span className="ml-2">Payment Success</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "250px" }} className=" mt-3">
        <h5>Transaction ID: {paymentData?._id} </h5>
        <br />
        <h5>From: {paymentData?.accountHolderName} </h5>
        <br />
        <h5>Mode of Payment: Online</h5>
        <br />
        <h5>Card Number: {paymentData?.cardNumber} </h5>
        <br />
        <h5>Last Donated Amount: ₹ {paymentData?.donatedAmount} </h5>
        <br />
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column align-items-center">
        Thank you
        <br />
        <p>
          <i className="text-muted">This is a temperrory donation receipt</i>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentReceipt;
