const InstitutionRoutes = require("express").Router();
const { upload } = require("../middleware.js");
const {
  institutionCheck,
  institutionSignup,
  institutionLogin,
  getAllInstitutions,
  editInstitueById,
  getInstituteById,
} = require("./institutionController.js");

InstitutionRoutes.get("/", institutionCheck);
InstitutionRoutes.post("/signup", upload, institutionSignup);
InstitutionRoutes.post("/login", institutionLogin);
InstitutionRoutes.get("/get-all-institutions", getAllInstitutions);
InstitutionRoutes.get("/get-institute-by-id/:id", getInstituteById);
InstitutionRoutes.patch("/edit-institute-by-id/:id", editInstitueById);
module.exports = InstitutionRoutes;
