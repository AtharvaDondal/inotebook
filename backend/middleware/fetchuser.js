const jwt = require("jsonwebtoken");
const JWT_SECRET = "Atharvaisagoodb$oy";

// next user for calling next middleware or function and we can passed it as a second argument in routes(endpoint)
const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add object to req object

  // we are getting token from header
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ Error: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
