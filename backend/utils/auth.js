const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("hii");
    let token = req.headers.authorization;
    console.log(token)
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ error: true, message: "Token Required" });
    }
    // token = token.slice(7);
    token = token.split(" ")[1];
    // console.log(token)
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
