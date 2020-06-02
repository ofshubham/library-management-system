const router = require("express").Router();
const Issued = require("../../db/models/Issued");
const Member = require("../../db/models/Member");
const Book = require("../../db/models/Book");
const UserHistory = require("../../db/models/UserHistory");
const History = require("../../db/models/History");
const { formatIssuedBookDetails, formatIssueddata } = require("../formatter");
const { tokenVerifierForMember, tokenVerifierForAdmin } = require("../helper");

router.get("/issued", tokenVerifierForAdmin, async (req, res) => {
  let response = { msg: null, data: null };
  var issuedBooksData = await Issued.find({});
  formatIssuedBookDetails(issuedBooksData).then((data) => {
    response.msg = "SUCCESS";
    response.data = data;
    res.json(response);
  });
});

router.get("/issued/:id", tokenVerifierForMember, async (req, res) => {
  let { id } = req.params;
  let response = { msg: null, data: null };
  var issueddata = await Issued.find({ userId: id });
  formatIssueddata(issueddata).then((data) => {
    response.msg = "SUCCESS";
    response.data = data;
    res.json(response);
  });
});

router.get("/returnBook/:id", tokenVerifierForMember, async (req, res) => {
  let currentDate = new Date();
  let { id } = req.params;
  console.log(id);
  let response = { msg: "Failure", data: null };
  Issued.findById({ _id: id }, (err, doc) => {
    console.log(doc);
    if (doc) {
      Book.findOneAndUpdate(
        { _id: doc.mainBookId, "books._id": doc.issuedBookId },
        { $set: { "books.$.status": "0", "books.$.issueId": null } },
        async (err, doc1) => {
          let userhistory = await UserHistory.create({
            bookId: doc.mainBookId,
            issueDate: doc.issueDate,
            returnDate: currentDate,
            userId: doc.userId,
          });
          let history = await History.create({
            bookId: doc.mainBookId,
            issueDate: doc.issueDate,
            returnDate: currentDate,
            userId: doc.userId,
          });
          Issued.deleteOne({ _id: id }, (err, doc3) => {
            if (err) {
              console.log(err);
              res.json(response);
            } else {
              response.msg = "SUCCESS";
              res.json(response);
            }
          });
        }
      );
    } else {
      console.log("err", err);
      res.json(response);
    }
  });
});

module.exports = router;
