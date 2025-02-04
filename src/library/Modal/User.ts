import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  savedEventAndHackathon: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EventAndHackathon" },
  ],
  createdTeamUp: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamUp" }],
  appliedTeamUp: [
    {
      teamUp: { type: mongoose.Schema.Types.ObjectId, ref: "TeamUp" },
      isApproved: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
