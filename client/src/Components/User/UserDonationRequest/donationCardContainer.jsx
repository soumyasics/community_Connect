import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import orpImg from "../../../Assets/Images/orp-teady-bear.png";
import { useNavigate } from "react-router-dom";
import "./userDonationRequest.css";
const DonationCardContainer = ({ allAcceptedReqs, title, isPending }) => {
  const navigate = useNavigate();

  return (
    <Container fluid className="my-5">
      <h1 className="text-center text-dark">{title}</h1>

      <Container className="d-flex flex-wrap  gap-5 py-3">
        {allAcceptedReqs.map((req) => {
          return (
            <Card
              key={req._id}
              border={`${req?.isHighPriority === true ? "danger" : "primary"}`}
              className="shadow rounded pb-4 hover-shadow"
              onClick={() => {
                navigate(req._id);
              }}
              style={{ height: "400px", width: "18rem", cursor: "pointer" }}
            >
              <Card.Img
                className="hover-overlay hover-zoom hover-shadow"
                variant="top"
                src={orpImg}
              />
              <Card.Body className="h-50">
                <Card.Title className="text-primary font-weight-bold">
                  {req?.title}
                  <br />
                  <span className="text-secondary">
                    <small className="font-italic">
                      ({req.orphanageId?.name.slice(0, 25) || "Orphnage"})
                    </small>
                  </span>
                </Card.Title>
                <Card.Text className="h-50 mb-0">
                  {req.description.slice(0, 100) + "..." || "Description"}
                </Card.Text>

                {/* stop btn propagation here  */}
                <div className="d-flex align-items-center justify-content-center">
                  {isPending ? (
                    <Button
                      style={{ position: "absolute", bottom: "20px" }}
                      variant="success mx-auto"
                    >
                      Donate
                    </Button>
                  ) : (
                    <Button
                      style={{ position: "absolute", bottom: "20px" }}
                      variant="primary mx-auto"
                    >
                      View
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};
export default DonationCardContainer;
