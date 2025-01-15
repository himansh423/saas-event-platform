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
  },
  date: {
    required: true,
    type: String,
  },
  modeOfEvent: {
    required: true,
    type: String,
  },
  typeOfEvent: {
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
  loaction: {
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
    type: String,
    required: true,
  },
  eventPoster: {
    type: String,
    required: true,
  },
  instagramLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
});

const EventAndHackathon =
  mongoose.models.EventAndHackathon ||
  mongoose.model("EventAndHackathon", EventAndHackathonSchema);

export default EventAndHackathon;
