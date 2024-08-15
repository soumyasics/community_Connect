const userRoutes = require("express").Router();
const { upload } = require("../middleware.js");
const {
  userSignup,
  userLogin,
  userCheck,
  getUserById,
  getAllUsers,
  editUserById,forgotPassword
} = require("./userController.js");

userRoutes.get("/", userCheck);
userRoutes.post("/signup", upload, userSignup);
userRoutes.post("/login", userLogin);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.get("/get-all-users", getAllUsers);
userRoutes.get("/get-user-by-id/:id", getUserById);
userRoutes.patch("/edit-user-by-id/:id", editUserById);

userRoutes.get("/*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

module.exports = userRoutes;
