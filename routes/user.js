const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Candidate = require("../models/Candidate");

//register user
router.post("/api/user", async (req, res) => {
  const { username, role, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }

    user = new User({
      username,
      role,

      password,
    });

    //hashing password before storing in DB
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("JWTSECRET"),
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//load user and admin
router.get("/api/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// login user
router.post("/api/auth", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("JWTSECRET"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get all users
router.get("/api/users/all", auth, async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const candidate = await Candidate.find({ user_id: req.user.id });

    res.json({
      users,
      isCandidate: candidate.length === 0 ? false : true,
      candidate: candidate.length === 0 ? null : candidate,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//adding vote
router.post("/api/user/vote/:id", auth, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ msg: "authorization denied!!" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.votes !== 0) {
      return res.status(404).json({ msg: "This user has already voted!" });
    }
    user.votes = 1;
    await user.save();
    res.json({ msg: "You have successfully voted !" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
