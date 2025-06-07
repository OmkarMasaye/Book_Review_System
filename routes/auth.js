const express = require('express');
const router = express.Router();
const jwt=require("jsonwebtoken");
const validator = require('validator');
const User = require('../models/User');
require('dotenv').config();

//POST /signup – register a new user
router.post('/signup', async (req, res) => {
    const { username,mobile, email, password } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    
    const mobileStr = mobile != null ? mobile.toString().trim() : '';
    if (!mobileStr || !/^[7-9]\d{9}$/.test(mobileStr)) {
      return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            email,
            password,
            username,mobile
        });

        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//POST /login – authenticate and return a token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      
      const user = await User.findOne({ email: email });
      if (!user ||!(await user.comparePassword(password))) {
          return res.status(401).json({ error: "Invalid username or password" });
      }
      
      const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
      res.status(200).json({ token, msg: "User login successfully" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;