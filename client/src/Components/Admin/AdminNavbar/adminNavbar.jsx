import { Container, Navbar } from "react-bootstrap";
import "./adminNavbar.css";
const AdminNavbar = () => {
  return (
    <div id="admin-navbar-container">
      <Navbar id="admin-navbar" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>Community <span className="brand-connect">Connect </span></Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;