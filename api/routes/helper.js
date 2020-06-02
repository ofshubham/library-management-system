const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
function tokenVerifierForMember(req, res, next) {
  let verifyOptions = {
    issuer: "Library",
    audience: "member",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };
  let response = { msg: "INVALID TOKEN" };
  if (req.headers.authorization) {
    let token = req.headers.authorization.split("Bearer ")[1];
    fs.readFile(
      path.join(__dirname, "../keys/public.key"),
      "utf8",
      (err, public) => {
        if (err) {
          console.log("Error in retrieving public key: ", err);
          response.msg = "FAILURE";
          res.status(500).json(response);
        } else {
          jwt.verify(token, public, verifyOptions, (err, doc) => {
            if (err) {
              res.status(401).json(response);
            } else {
              next();
            }
          });
        }
      }
    );
  } else {
    response.msg = "AUTHORIZATION HEADER NOT FOUND";
    res.status(401).json(response);
  }
}

function tokenVerifierForAdmin(req, res, next) {
  let verifyOptions = {
    issuer: "Library",
    audience: "admin",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };
  let response = { msg: "INVALID TOKEN" };
  if (req.headers.authorization) {
    let token = req.headers.authorization.split("Bearer ")[1];
    fs.readFile(
      path.join(__dirname, "../keys/public.key"),
      "utf8",
      (err, public) => {
        if (err) {
          console.log("Error in retrieving public key: ", err);
          response.msg = "FAILURE";
          res.status(500).json(response);
        } else {
          jwt.verify(token, public, verifyOptions, (err, doc) => {
            if (err) {
              res.status(401).json(response);
            } else {
              next();
            }
          });
        }
      }
    );
  } else {
    response.msg = "AUTHORIZATION HEADER NOT FOUND";
    res.status(401).json(response);
  }
}

module.exports = { tokenVerifierForMember, tokenVerifierForAdmin };
