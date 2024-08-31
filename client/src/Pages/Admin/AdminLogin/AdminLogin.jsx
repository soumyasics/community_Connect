import AdminNavbar from "../../../Components/Admin/AdminNavbar/adminNavbar";
import AdminLoginForm from "../../../Components/Admin/AdminLoginForm/adminLoginForm";
import AdminFooter from "../../../Components/Admin/AdminFooter/adminFooter.jsx";
import "./AdminLogin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("cc-admin");
    if (admin) {
      navigate('/admin')
    }
  }, []);
  return (
    <div className="admin-login-container">
      <AdminNavbar />
      <AdminLoginForm />
      <div style={{ position: "absolute", bottom: "0" }} className="w-100">
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLogin;
