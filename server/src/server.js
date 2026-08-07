const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8800;
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// register routes

// start server
app.listen(port, () => {
  console.log("Backend server is running");
});
