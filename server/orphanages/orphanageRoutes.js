const orphanageRoutes = require("express").Router();
const { upload } = require("../middleware.js");
const {
  orphanageCheck,
  orphanageSignup,
  orphanageLogin,
  getAllOrphanages,
  getOrphanageById,
  editOrpById,
  forgotPassword,
} = require("./orphanageController.js");

orphanageRoutes.get("/", orphanageCheck);
orphanageRoutes.post("/signup", upload, orphanageSignup);
orphanageRoutes.post("/login", orphanageLogin);
orphanageRoutes.get("/get-all-orphanages", getAllOrphanages);
orphanageRoutes.get("/get-orphanage-by-id/:id", getOrphanageById);
orphanageRoutes.patch("/edit-orphanage-by-id/:id", editOrpById);
orphanageRoutes.post("/forgot-password", forgotPassword);
module.exports = orphanageRoutes;
