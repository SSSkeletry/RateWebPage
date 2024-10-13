const jwt = require('jsonwebtoken');  

const authenticateTokenOptional = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return next(); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};

module.exports = authenticateTokenOptional;