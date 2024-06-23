const {
  createDonationRequest,
  getAllRequests,
  getAllRequestsByinstituteId,
  getDonationRequestById,
  approveReqById,
  rejectReqById,
} = require("./donationRequestController.js");

const insDonationRequestRoutes = require("express").Router();

insDonationRequestRoutes.get("/check", (req, res) => {
  return res.status(200).json({ message: "ins donation request working" });
});

insDonationRequestRoutes.post("/create-donation-request", createDonationRequest);
insDonationRequestRoutes.get("/get-all-requests", getAllRequests);
insDonationRequestRoutes.get(
  "/get-all-requests-by-ins-id/:id",
  getAllRequestsByinstituteId
);
insDonationRequestRoutes.get("/get-donation-request/:id", getDonationRequestById);
insDonationRequestRoutes.patch("/approve-donation-request/:id", approveReqById);
insDonationRequestRoutes.patch("/reject-donation-request/:id", rejectReqById);

module.exports = insDonationRequestRoutes;     
