const { Schema, model } = require("mongoose");
const donationSchema = Schema(
  {
    insId: {
      type: Schema.Types.ObjectId,
      ref: "institution",
      required: true,
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "instituteDonationRequest",
      required: true,
    },
    donatedAmount: {
      type: String,
      required: true,
    },
    donatedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    donatedOrganizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    accountHolderName: {
      type: String,
      default: null,
    },
    cardNumber: {
      type: String,
      default: null,
    },
    modeOfPayment: {
      type: String,
      default: "Online",
    },
  },
  {
    timestamps: true,
  }
);

const DonationModel = model("InsDonation", donationSchema);
module.exports = { DonationModel };
