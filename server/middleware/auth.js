const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const token = req.headers["authtoken"];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Token is not valid " });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { name } = req.user;
  User.findOne({ name }).exec((err, adminUser) => {
    if (err) throw err;
    if (adminUser.role != "admin") {
      res.status(403).json({ msg: "Admin Access denied" });
    } else {
      next();
    }
  });
};
