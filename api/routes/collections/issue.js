const router = require("express").Router();
const Request = require("../../db/models/Request");
const Member = require("../../db/models/Member");
const Book = require("../../db/models/Book");
const Issued = require("../../db/models/Issued");
const { issueDetailFormatter } = require("../formatter");
const { tokenVerifierForMember, tokenVerifierForAdmin } = require("../helper");

//issue request
router.post("/reqIssue/:days", tokenVerifierForMember, async (req, res) => {
  let currentDate = new Date();
  let { userid, data } = req.body;
  let days = req.params.days;
  let response = { msg: null, data: null };
  if (currentDate.getHours() <= 24) {
    Member.findOne({ _id: userid }, (err, doc) => {
      if (err) {
        response.msg = "INVALID USER";
        res.json(response);
      } else {
        let expireDate = doc.membershipexpire;
        if (currentDate > expireDate) {
          response.msg = "Membership has expired! Please renew";
          res.json(response);
        } else {
          let diffTime = Math.abs(expireDate.getTime() - currentDate.getTime());
          let diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
          if (days == 7 && diffDays <= 5) {
            response.msg = "Number of Issue days is exceeding membership";
            res.json(response);
          } else {
            dataToBeSaved = {};
            dataToBeSaved["bookId"] = data[3];
            dataToBeSaved["memberId"] = userid;
            dataToBeSaved["requestedDays"] = days;
            console.log(dataToBeSaved);
            Request.create(dataToBeSaved, (err, doc) => {
              if (err) {
                console.log(err);
                response.msg = "FAILURE";
                res.json(response);
              } else {
                response.msg = "SUCCESS";
                res.json(response);
              }
            });
          }
        }
      }
    });
  } else {
    response.msg = "You cannot issue after 3PM";
    res.json(response);
  }
});

//reject request
router.get("/rejIssue/:id", tokenVerifierForAdmin, async (req, res) => {
  let { id } = req.params;
  let response = { msg: null, data: null };
  Request.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      response.msg = "FAILURE";
      res.json(response);
    } else {
      response.msg = "SUCCESS";
      res.json(response);
    }
  });
});

// accept issue request
router.post("/acceptRequest", tokenVerifierForAdmin, async (req, res) => {
  let currenDate = new Date();
  let [
    title,
    name,
    requestDateTime,
    requestedDays,
    bookId,
    memberId,
    RequestId,
  ] = req.body;
  console.log(bookId);
  let response = { msg: null, data: null };
  Book.findOne({ _id: bookId }, (err, doc) => {
    let mainBookId = bookId;
    var issuedBookId = null;
    if (err) {
      response.msg = "FAILURE";
      res.json(response);
    } else {
      let flag = 0;
      doc.books.forEach((e) => {
        if (e.type == 2 && e.status == 0) {
          flag = 1;
          issuedBookId = e._id;
        }
      });
      if (flag == 0) {
        response.msg = "Books Unavailable";
        res.json(response);
      } else {
        issuedata = {};
        issuedata["mainBookId"] = mainBookId;
        issuedata["issuedBookId"] = issuedBookId;
        issuedata["requestedDays"] = requestedDays;
        issuedata["issueDate"] = currenDate;
        issuedata["requestedDate"] = requestDateTime;
        issuedata["userId"] = memberId;
        Issued.create(issuedata, (err, doc1) => {
          if (doc1) {
            Request.deleteOne({ _id: RequestId }, (err2, doc) => {
              Book.findOneAndUpdate(
                { _id: mainBookId, "books._id": issuedBookId },
                {
                  $set: {
                    "books.$.status": "1",
                    "books.$.issueId": doc1._id,
                  },
                },
                (err, doc4) => {
                  if (err) {
                    response.msg = "FAILURE";
                    res.json(response);
                  } else {
                    response.msg = "SUCCESS";
                    res.json(response);
                  }
                }
              );
            });
          } else {
            response.msg = "FAILURE";
            res.json(response);
          }
        });
      }
    }
  });
});

//get requests
router.get("/requests", tokenVerifierForAdmin, async (req, res) => {
  let response = { msg: null, data: null };
  let issudetails = await Request.find({});
  if (issudetails) {
    issueDetailFormatter(issudetails).then((data) => {
      response.msg = "SUCCESS";
      response.data = data;
      res.json(response);
    });
  } else {
    response.msg = "FAILURE";
    res.json(response);
  }
});

module.exports = router;
