import { useState } from "react";
import { Button, Col, Row, Toast, ToastContainer } from "react-bootstrap";

const useToast = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("dark");

  const showToast = (
    message = "Updating..",
    bgColor = "dark",
    delay = 2000
  ) => {
    setMessage(message);
    setBgColor(bgColor);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, delay);
  };

  const ToastComponent = (
    <ToastContainer
      position="top-center"
      style={{ position: "fixed", top: "5px", left: 0, right: 0, zIndex: 9999 }}
    >
      <Toast
        onClose={() => setShow(false)}
        bg={bgColor}
        show={show}
        style={{ color: "white" }}
        delay={3000}
        autohide
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );

  return { showToast, ToastComponent };
};

export default useToast;
