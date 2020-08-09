const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require("../models/User");
const authm = require("../middleware/authm");
const auth = require("../middleware/auth");

//add new candidate
router.post("/api/candidate/create", authm, async (req, res) => {
  const {
    user_id,
    no_of_challenges_solved,
    data_Structure,
    candidate_expertise_level,
    algorithms,
    java,
    python,
    nodejs,
  } = req.body;
  try {
    var candidate = await Candidate.findOne({ user_id });
    if (candidate) {
      return res.status(400).json({ msg: "This user is already a candidate" });
    }
    const user = await User.findById(user_id);
    const name = user.username;
    console.log(name);
    const expert_in = {
      data_Structure,
      algorithms,
      java,
      python,
      nodejs,
    };
    candidate = new Candidate({
      user_id,
      name,
      no_of_challenges_solved,
      candidate_expertise_level,
      expert_in,
    });
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//get all candidates
router.get("/api/candidates/all", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//edit candidate
router.put("/api/candidate/:id", auth, async (req, res) => {
  try {
    const {
      no_of_challenges_solved,
      data_Structure,
      candidate_expertise_level,
      algorithms,
      java,
      python,
      nodejs,
    } = req.body;
    const user = await Candidate.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Candidate not found" });
    }

    if (user.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "unauthorized access" });
    }
    let updatedCandidate = {};
    if (no_of_challenges_solved)
      updatedCandidate.no_of_challenges_solved = no_of_challenges_solved;
    if (candidate_expertise_level)
      updatedCandidate.candidate_expertise_level = candidate_expertise_level;
    updatedCandidate.expert_in = {};
    if (data_Structure)
      updatedCandidate.expert_in.data_Structure = data_Structure;
    if (algorithms) updatedCandidate.expert_in.algorithms = algorithms;
    if (java) updatedCandidate.expert_in.java = java;
    if (python) updatedCandidate.expert_in.python = python;
    if (nodejs) updatedCandidate.expert_in.nodejs = nodejs;
    let newCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $set: updatedCandidate },
      { new: true }
    );
    console.log(updatedCandidate);
    res.json(newCandidate);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//delete candidate
router.delete("/api/candidate/:id", authm, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(500).json({ msg: "candidate not found" });
    }
    await candidate.remove();
    res.json("candidate removed successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ masg: "server error" });
  }
});
module.exports = router;
