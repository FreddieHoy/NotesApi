const mongoose = require("mongoose");

export interface AppType {
  notes: Note[];
}

type Note = {
  heading: string;
  content: string;
  rating?: number;
  date_created: Date;
};

const note = new mongoose.Schema({
  heading: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5, default: 3 },
  date_created: { type: Date, required: true, default: new Date() },
  // isPublic: { type: Boolean, required: true, defualt: false },
  // date_last_updated: { type: Date, required: true },
  // image: { type: String, get: (a) => `${root}${a}` },
});

module.exports = mongoose.model("Note", note);

// const root = "https://s3.amazonaws.com/mybucket";
