import mongoose from "mongoose";
const { Schema } = mongoose;

const teamUpSchema = new Schema({
  hackName: {
    type: String,
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  description: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  appliedBy:[ { type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  eventOrHackathonUrl: {
    type: String,
    required: true,
  },
});

const TeamUp = mongoose.models.TeamUp || mongoose.model("TeamUp", teamUpSchema);

export default TeamUp;
