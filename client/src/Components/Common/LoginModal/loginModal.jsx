import { Row, Col, Button, Modal, Image, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginModal.css";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/user/login");
  };
  const redirectSignup = () => {
    navigate("/user/signup");
  };
  const redirectInfo = () => {
    navigate("/user/info");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="font-weight-bold"
          id="contained-modal-title-vcenter"
        >
          Community Connect
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col
            xs={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src="https://cdni.iconscout.com/illustration/premium/thumb/orphanage-donation-3981555-3581609.png"
              thumbnail
              alt="donation"
              className="w-100"
            />
          </Col>
          <Col xs={6}>
            <h4 className="font-weight-bold text-center">Join the movement.</h4>
            <p className="text-center">
              There is no exercise better for the heart than reaching down and
              lifting people up.
            </p>
            <Container className="text-center mt-3">
              <div className="d-flex flex-column align-items-center">
                <Button
                  variant="info"
                  className="mt-2 center w-50 text-light"
                  onClick={redirectSignup}
                >
                  Signup
                </Button>
              </div>
              <h6 className="text-center mt-4">
                Already have an account ?{" "}
                <strong onClick={redirectLogin} role="button">
                  Login{" "}
                </strong>
              </h6>
            </Container>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-info" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function LoginModalTest() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
export default LoginModal;
