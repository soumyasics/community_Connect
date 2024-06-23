const InstitutionModel = require("./institutionModel.js");
const bcrypt = require("bcrypt");

const institutionCheck = async (req, res) => {
  try {
    return res.status(200).json({ message: "institution Route working" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
const institutionSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const oldUser = await InstitutionModel.findOne({ email });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "Email already taken try a different email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newInstitution = await new InstitutionModel({
      name: req?.body?.name,
      yearOfEstablishment: req?.body?.yearOfEstablishment,
      email: req?.body?.email,
      password: hashedPassword,
      type: req?.body?.type,
      address: req?.body?.address,
      city: req?.body?.city,
      state: req?.body?.state,
      pincode: req?.body?.pincode,
      phoneNumber: req?.body?.phoneNumber,
      description: req?.body?.description,
      img: req?.file,
    });
    await newInstitution.save();

    return res.status(201).json({
      message: "Institution successfully registered",
      data: newInstitution,
    });
  } catch (error) {
    console.log("error on Institution signup", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const institutionLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingInstitute = await InstitutionModel.findOne({ email });
    if (!existingInstitute) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingInstitute.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }

    return res.status(200).json({
      message: "Institution Successfully Logged in",
      data: existingInstitute,
    });
  } catch (error) {
    console.log("error on Institution login", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getAllInstitutions = async (req, res) => {
  try {
    const Institutions = await InstitutionModel.find();
    return res
      .status(200)
      .json({ message: "Get all Institutions", data: Institutions });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getInstituteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const Institution = await InstitutionModel.findById(id);
    if (!Institution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    return res
      .status(200)
      .json({ message: "Institution found", data: Institution });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const editInstitueById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const Institution = await InstitutionModel.findById(id);
    if (!Institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    let updated = await InstitutionModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Institution updated", data: updated });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Checking if id is valid
const isValidObjectId = (id) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const isValid = ObjectId.isValid(id);

  // check if converting id back to a string results in same value
  const isStringEqual = new ObjectId(id).toString() === id;
  return isValid && isStringEqual;
};

module.exports = {
  institutionCheck,
  institutionSignup,
  institutionLogin,
  getAllInstitutions,
  editInstitueById,
  getInstituteById
};
