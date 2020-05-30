const router = require("express").Router();
const jwt = require("jsonwebtoken");
users = [{ name: "admin", pwd: "admin@" }];
router.get("/users", async (req, res) => {
  //   let token = await jwt.sign({ username: "test" }, "shubham");
  res.json(users);
});

router.post("/users", async (req, res) => {
  res.json("saved");
});

router.put("/users/:id", async (req, res) => {});

router.delete("/users/:id", async (req, res) => {});
module.exports = router;
