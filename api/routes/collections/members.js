const router = require("express").Router();
const Member = require("../../db/models/Member");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { tokenVerifierForMember, tokenVerifierForAdmin } = require("../helper");

router.post("/members", tokenVerifierForAdmin, async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    new Member(req.body).save((err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    });
  });
});
// router.get("/test", (req, res) => {
//   Member.findOne({ _id: "5ed55faea8719123ecd70035" }, (err, doc) => {
//     // new Date(2020, 05, 20).getTime() - doc.membershipexpire.getTime();
//     // console.log(, new Date());
//     console.log(new Date(doc.membershipexpire).toString());
//     console.log(new Date().toString());
//     console.log(
//       Math.ceil(
//         Math.abs(doc.membershipexpire - new Date()) / (1000 * 60 * 60 * 24)
//       )
//     );
//     res.json(
//       new Date(2020, 05, 20).getTime() -
//         doc.membershipexpire.getTime() / 3600000
//     );
//   });
// });
router.get("/members", tokenVerifierForAdmin, async (req, res) => {
  let response = { msg: null, data: [] };
  const members = await Member.find({});
  members.forEach((m) =>
    response.data.push([
      m.name,
      m.membershipexpire.toString(),
      m.membershiphours,
      m.created_at.toString(),
      m._id,
    ])
  );
  if (response) {
    response.msg = "SUCCESS";
    res.json(response);
  } else {
    response.msg = "FAILURE";
    res.json(response);
  }
});

router.put("/members", tokenVerifierForAdmin, async (req, res) => {
  let { id, expression } = req.body;
  let response = { msg: null, data: null };
  Member.findOne({ _id: id }, (err, doc) => {
    if (err) {
      console.log(err);
      response.msg = "FAILURE";
      res.json(response);
    } else {
      expression.membershipexpire = new Date(expression.membershipexpire);
      doc.membershipexpire = new Date(doc.membershipexpire);
      console.log(
        typeof expression.membershipexpire,
        typeof doc.membershipexpire
      );

      let diffTime = Math.abs(
        new Date(expression.membershipexpire) -
          new Date(doc.membershipexpire.toISOString())
      );
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      expression.membershipdays = doc.membershipdays + diffDays;
      expression.membershipexpire = new Date(expression.membershipexpire);
      Member.findOneAndUpdate(
        { _id: id },
        { $set: expression },
        (err, data) => {
          if (err) {
            console.log(err);
            response.msg = "FAILURE";
            res.json(response);
          } else {
            response.msg = "SUCCESS";
            res.json(response);
          }
        }
      );
    }
  });
});

module.exports = router;
