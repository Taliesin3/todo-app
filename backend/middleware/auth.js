const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    
    // Validate
    // token exists
    if (!token)
      return res
        .status(401)
        .json({msg: "No authentication token, authorisation denied."});

    // token is valid
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verifiedUser)
      return res
        .status(401)
        .json({msg: "Token verification failed, authorisation denied."});

      // Add verified user id to the request for next operation
      req.user = verifiedUser.id;
      next();
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = auth;