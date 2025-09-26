const jwt=require("jsonwebtoken")
require('dotenv').config();
const tokenBlacklist = new Set();


// Middleware to authenticate JWT tokens and add user info to req.user
const authenticate = (req, res, next) => {
    const authorization = req.headers.authorization
  
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
  
    
    const token = req.headers.authorization.split(' ')[1];
    if (tokenBlacklist.has(token)) {
      return res.status(401).send("Token is blacklisted");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });  
    }
  };

  module.exports={authenticate};