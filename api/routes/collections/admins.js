const router = require("express").Router();
const Admin = require("../../db/models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {tokenVerifierForMember, tokenVerifierForAdmin} = require('../helper');

router.post("/admins", tokenVerifierForAdmin, async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    let admin = new Admin(req.body);
    admin.save((err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    });
  });
});

module.exports = router;
