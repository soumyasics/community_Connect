const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    yearOfEstablishment: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    img: {
      type: Object,
      default: null,
    },
    totalReceivedAmt: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const InstitutionModel = mongoose.model("institution", institutionSchema);
module.exports = InstitutionModel;
