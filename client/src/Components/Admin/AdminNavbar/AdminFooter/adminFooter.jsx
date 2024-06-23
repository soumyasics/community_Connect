import {Row, Col, Container } from "react-bootstrap";
import "./adminFooter.css";
const AdminFooter = () => {
  return (
    <Container fluid className="admin-footer">
      <Row>
        <Col>
         <p> Copyright © 2023</p>
         <p>All rights reserved by Community Connect</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFooter;
