const mongoose = require("mongoose");

//candidate model
const CandidateSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    no_of_challenges_solved: { type: Number, default: 0, required: true },
    candidate_expertise_level: {
      type: String,
      required: true,
    },
    expert_in: {
      data_Structure: {
        type: String,
        default: "1",
      },
      algorithms: {
        type: String,
        default: "1",
      },
      java: {
        type: String,
        default: "1",
      },
      python: {
        type: String,
        default: "1",
      },
      nodejs: {
        type: String,
        default: "1",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
