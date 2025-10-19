const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Authenticated user:', decoded); // for debugging
      req.user = decoded;
      next();
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization token required' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    console.warn(`Access denied: User ${req.user?.id} is not admin`);
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = {
  protect,
  isAdmin,
};
