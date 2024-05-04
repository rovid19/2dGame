import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  player: String,
  score: Number,
});

const scoreModel = mongoose.model("score", scoreSchema);

export default scoreModel;
