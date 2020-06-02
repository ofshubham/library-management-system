const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router")(app);
const mongoose = require("./db/connection");

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
