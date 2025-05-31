const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const router = require("./routes");
require("dotenv").config();

const app = express();
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api", router);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    status: "success",
  });
});
app.use(cookieParser());

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Database connect successfully");
    console.log(`Server is running on port: ${PORT}`);
  });
});
