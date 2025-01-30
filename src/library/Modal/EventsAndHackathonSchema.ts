import mongoose from "mongoose";

const { Schema } = mongoose;

const EventAndHackathonSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  shortDescription: {
    required: true,
    type: String,
    maxlength: 30,
  },
  dateStart: {
    required: true,
    type: Date,
  },
  dateEnd: {
    type: Date,
  },
  applicationCloseDate: {
    type: Date,
    require: true,
  },
  modeOfEvent: {
    required: true,
    type: String,
  },
  typeOfEvent: {
    required: true,
    type: String,
  },
  isOpen: {
    required: true,
    type: Boolean,
  },
  theme: {
    required: true,
    type: [String],
  },
  logo: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  prize: {
    required: true,
    type: String,
  },
  teamSize: {
    required: true,
    type: String,
  },
  aboutDescriptions: {
    required: true,
    type: String,
    minlength: 50,
  },
  eventPoster: {
    required: true,
    type: String,
  },
  instagramLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  eventOrHackathonUrl: {
    type: String,
    required: true,
  },
});

const EventAndHackathon =
  mongoose.models.EventAndHackathon ||
  mongoose.model("EventAndHackathon", EventAndHackathonSchema);

export default EventAndHackathon;
