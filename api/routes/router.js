module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Hellow");
  });
  app.use("/api", require("./collections/users"));
  app.use("/api", require("./collections/auth"));
  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
