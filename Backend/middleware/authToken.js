const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authToken = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      throw new Error('Please Login!');
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) {
        console.log("error auth", error);
      }

      req.userId = decoded?._id;

      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;
