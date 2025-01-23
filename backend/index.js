const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/connectDb");
const router = require("./Router/user.routes");
require("dotenv").config();

const PORT = process.env.PORT;

//! Middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", router);

//! Page not found
app.use("*", (req, res, next) => {
  res.status(404).send("Page not found");
});

//! Error Handling
app.use((err, req, res, next) => {
  const errMsgs = err.message.split(":");
  const errMsg = errMsgs[errMsgs.length - 1];
  res.status(500).json({ error: true, message: errMsg });
});

const startServer = async () => {
  await connectDB(process.env.MONGO_URL);
  console.log("Mongodb Connection established");
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;
