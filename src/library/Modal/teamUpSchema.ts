import mongoose from "mongoose";
const { Schema } = mongoose;

const teamUpSchema = new Schema({
  hackName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: {
    type: String,
    required: true,
  },
  dateStart: {
    required: true,
    type: Date,
  },
  dateEnd: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  appliedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  eventOrHackathonUrl: {
    type: String,
    required: true,
  },
});

const TeamUp = mongoose.models.TeamUp || mongoose.model("TeamUp", teamUpSchema);

export default TeamUp;
