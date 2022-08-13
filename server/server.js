const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

// app
const app = express();

app.use(express.static(__dirname + "/public"));

// connect DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB CONNECT ERR", err);
  });

// middleware
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// devtool
app.use(morgan("dev"));

// routes
// app.use("/api", authRoutes)
// app.use("/api", personRoutes)
readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
