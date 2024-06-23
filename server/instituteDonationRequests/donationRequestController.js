const InstituteModel = require("../institutions/institutionModel.js");
const InstituteDonationRequestModel = require("./donationRequestModel.js");

const createDonationRequest = async (req, res) => {
  try {
    const { insId, title, targetAmount, bankAcNumber } = req.body;

    if (!insId || !title || !targetAmount || !bankAcNumber) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const institute = await InstituteModel.findById(insId);
    if (!institute) {
      return res.status(404).json({ message: "institute not found" });
    }
    let convertedAmount = Number(targetAmount);
    if (isNaN(convertedAmount)) {
      return res.status(401).json({ message: "Target amount is not a number" });
    }
    const newRequest = await new InstituteDonationRequestModel({
      insId,
      title,
      targetAmount: convertedAmount,
      bankAcNumber,
      deadline: req.body?.deadline,
      category: req.body?.category,
      urgencyLevel: req.body?.urgencyLevel,
      description: req.body?.description,
      bankAcDetails: req.body?.bankAcDetails,
    });
    await newRequest.save();
    return res.status(201).json({
      message: "Donation requested created successfully",
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await InstituteDonationRequestModel.find().populate(
      "insId"
    );
    return res
      .status(200)
      .json({ message: "All donation requests", data: requests });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

const getAllRequestsByinstituteId = async (req, res) => {
  try {
    const insId = req?.params?.id;
    if (!insId) {
      return res.status(400).json({ message: "institute id is required" });
    }

    if (!isValidObjectId(insId)) {
      return res.status(400).json({ message: "institute id is not valid" });
    }

    const getinstitute = await InstituteModel.findById(insId);
    if (!getinstitute) {
      return res.status(404).json({ message: "institute not found" });
    }

    const getAllinstituteRequests = await InstituteDonationRequestModel.find({
      insId: insId,
    });

    return res.status(200).json({
      message: "Get all institute requests by id",
      data: getAllinstituteRequests,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getDonationRequestById = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required." });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid." });
    }
    const getRequest = await InstituteDonationRequestModel.findById(
      id
    ).populate("insId");

    if (!getRequest) {
      return res.status(400).json({ message: "Request not found." });
    }
    return res.status(200).json({
      message: "Get donation request by id",
      data: getRequest,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const approveReqById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: "Id is not valid" });
    }
    const getRequest = await InstituteDonationRequestModel.findById(id);
    if (!getRequest) {
      return res.status(404).send({ message: "Request not found" });
    }

    const result = await InstituteDonationRequestModel.updateOne(
      { _id: id },
      { $set: { isAdminApproved: "approved" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    const updatedRequest = await InstituteDonationRequestModel.findById(id);
    return res
      .status(200)
      .json({ message: "Request approved successfully", data: updatedRequest });
  } catch (error) {
    return res.status(500).json({ message: "Server erorr" });
  }
};

const rejectReqById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: "Id is not valid" });
    }
    const getRequest = await InstituteDonationRequestModel.findById(id);
    if (!getRequest) {
      return res.status(404).send({ message: "Request not found" });
    }

    const result = await InstituteDonationRequestModel.updateOne(
      { _id: id },
      { $set: { isAdminApproved: "rejected" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    const updatedRequest = await InstituteDonationRequestModel.findById(id);
    return res
      .status(200)
      .json({ message: "Request rejected successfully", data: updatedRequest });
  } catch (error) {
    return res.status(500).json({ message: "Server erorr" });
  }
};

const isValidObjectId = (id) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const isValid = ObjectId.isValid(id);

  if (!isValid) {
    return false;
  }
  // check if converting id back to a string results in same value
  const isStringEqual = new ObjectId(id).toString() === id;
  return isValid && isStringEqual;
};

module.exports = {
  createDonationRequest,
  getAllRequests,
  getAllRequestsByinstituteId,
  getDonationRequestById,
  approveReqById,
  rejectReqById,
};
