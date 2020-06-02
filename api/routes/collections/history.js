const router = require("express").Router();
const mongoose = require("mongoose");
const History = require("../../db/models/History");
const UserHistory = require("../../db/models/UserHistory");
const Book = require("../../db/models/Book");
const Member = require("../../db/models/Member");
const { userHistoryFormatter, historyFormatter } = require("../formatter");
const { tokenVerifierForMember, tokenVerifierForAdmin } = require("../helper");

router.get("/usersH/:id", tokenVerifierForMember, async (req, res) => {
  let { id } = req.params;
  let response = { msg: null, data: null };
  let userHistory = await UserHistory.find({ userId: id });
  userHistoryFormatter(userHistory).then((data) => {
    response.msg = "SUCCESS";
    response.data = data;
    res.json(response);
  });
});
router.get("/adminsH", tokenVerifierForAdmin, async (req, res) => {
  let response = { msg: null, data: null };
  let history = await History.find({});
  historyFormatter(history).then((data) => {
    response.msg = "SUCCESS";
    response.data = data;
    res.json(response);
  });
});
router.get("/deleteH/:id", tokenVerifierForMember, async (req, res) => {
  let { id } = req.params;
  let response = { msg: null, data: null };
  UserHistory.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      response.msg = "FAILURE";
      res.json(response);
    } else {
      response.msg = "SUCCESS";
      res.json(response);
    }
  });
});
module.exports = router;
