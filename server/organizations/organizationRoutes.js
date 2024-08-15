const organizationRoutes = require("express").Router();
const { upload } = require("../middleware.js");
const {
  organizationCheck,
  organizationSignup,
  organizationLogin,
  getAllOrganizations,
  getOrgById,
  editOrgById,
  forgotPassword
} = require("./organizationController.js");

organizationRoutes.get("/", organizationCheck);
organizationRoutes.post("/signup", upload, organizationSignup);
organizationRoutes.post("/forgot-password", forgotPassword);
organizationRoutes.post("/login", organizationLogin);
organizationRoutes.get("/get-all-organizations", getAllOrganizations);
organizationRoutes.get("/get-org-by-id/:id", getOrgById);
organizationRoutes.patch("/edit-org-by-id/:id", editOrgById);
module.exports = organizationRoutes;
