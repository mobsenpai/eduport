const dotenv = require("dotenv");
dotenv.config();
require("./config/connection.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 8800;
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/authRoutes.js");

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// register routes
app.use("/api/auth", authRoute);

// start server
app.listen(port, () => {
  console.log("Backend server is running");
});
