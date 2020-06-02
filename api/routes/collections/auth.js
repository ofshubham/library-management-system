const router = require("express").Router();
const Admin = require("../../db/models/Admin");
const Member = require("../../db/models/Member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

router.post("/alogin", (req, res) => {
  let response = { msg: null, token: null, uid: null };
  let { username, password } = req.body;
  console.log(req.body);
  Admin.findOne({ username: username }, (err, doc) => {
    if (doc) {
      bcrypt.compare(password, doc.password, (err, result) => {
        if (result) {
          fs.readFile("keys/private.key", "utf8", (err, private) => {
            let signOption = {
              issuer: "Library",
              audience: "admin",
              expiresIn: "1h",
              algorithm: "RS256",
            };
            let payload = {
              username: username,
            };
            if (err) console.log(err);
            else {
              jwt.sign(payload, private, signOption, (err, token) => {
                if (err) {
                  console.log(err);
                  response.msg = "FAILURE";
                  res.json(response);
                } else {
                  response.msg = "SUCCESS";
                  response.token = token;
                  response.uid = doc._id;
                  res.json(response);
                }
              });
            }
          });
        } else {
          response.msg = "WRONG CREDENTIALS";
          res.json(response);
        }
      });
    } else {
      response.msg = "INVALID USER";
      res.json(response);
    }
  });
});

router.post("/mlogin", (req, res) => {
  let response = { msg: null, token: null, uid: null };
  let { username, password } = req.body;
  // console.log(req.body);
  Member.findOne({ username: username }, (err, doc) => {
    // console.log(err);
    if (doc) {
      bcrypt.compare(password, doc.password, (err, result) => {
        if (result) {
          fs.readFile("keys/private.key", "utf8", (err, private) => {
            let signOption = {
              issuer: "Library",
              audience: "member",
              expiresIn: "1h",
              algorithm: "RS256",
            };
            let payload = {
              username: username,
            };
            if (err) console.log(err);
            else {
              jwt.sign(payload, private, signOption, (err, token) => {
                if (err) {
                  console.log(err);
                  response.msg = "FAILURE";
                  res.json(response);
                } else {
                  response.msg = "SUCCESS";
                  response.token = token;
                  response.uid = doc._id;
                  res.json(response);
                }
              });
            }
          });
        } else {
          response.msg = "WRONG CREDENTIALS";
          res.json(response);
        }
      });
    } else {
      response.msg = "INVALID USER";
      res.json(response);
    }
  });
});

const generateToken = () => {};

module.exports = router;
