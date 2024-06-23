const insDonationRoutes = require("express").Router();
const {
  createDonation,
  donationsDoneByOrg,
  donationsDoneByUser,
  allDonations,
  allDonationsByASingleOrg,
  allDonationsByASingleUser,
  donationsToASingleInstitute,
} = require("./donationController.js");

insDonationRoutes.get("/check", (req, res) => {
  return res.status(200).json({ message: "institute donation route working" });
});

insDonationRoutes.post("/create", createDonation);
insDonationRoutes.get("/get-all-donations", allDonations);
insDonationRoutes.get("/donations-done-by-users", donationsDoneByUser);
insDonationRoutes.get("/donations-done-by-organizations", donationsDoneByOrg);
insDonationRoutes.get(
  "/donations-done-by-single-user/:id",
  allDonationsByASingleUser
);
insDonationRoutes.get(
  "/donations-done-by-single-org/:id",
  allDonationsByASingleOrg
);
insDonationRoutes.get(
  "/donations-to-single-institute/:id",
  donationsToASingleInstitute
);

module.exports = insDonationRoutes;
