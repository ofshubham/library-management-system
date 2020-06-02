module.exports = function (app) {
  const bodyParser = require("body-parser");
  const cors = require("cors");
  // support parsing of application/json type post data
  app.use(bodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hellow");
  });
  app.use("/api", require("./collections/admins"));
  app.use("/api", require("./collections/members"));
  app.use("/api", require("./collections/auth"));
  app.use("/api", require("./collections/books"));
  app.use("/api", require("./collections/issue"));
  app.use("/api", require("./collections/issued"));
  app.use("/api", require("./collections/history"));
  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
