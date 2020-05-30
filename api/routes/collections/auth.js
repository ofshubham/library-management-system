const router = require("express").Router();

router.get("/login", (req, res) => {
  res.json({ auth: true });
});

module.exports = router;
