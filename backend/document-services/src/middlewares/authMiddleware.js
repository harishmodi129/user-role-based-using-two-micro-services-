const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/auth/validate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.valid) {
      req.user = response.data.user; // Attach user data to the request
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  } catch (err) {
    console.error("Error validating token:", err);
    res.status(403).json({ message: "Forbidden: Token validation failed" });
  }
};

module.exports = authMiddleware;
