const router = require("express").Router();
const Book = require("../../db/models/Book");
const { tokenVerifierForMember, tokenVerifierForAdmin } = require("../helper");

//route for inserting a book
router.post("/books", tokenVerifierForAdmin, async (req, res) => {
  let response = { msg: null, data: null };
  let { author, isbn, title, forReading, forIssue } = req.body;
  books = [];
  bookRead = {
    status: 0,
    type: 1,
    issueId: null,
  };
  bookIssue = {
    status: 0,
    type: 2,
    issueId: null,
  };
  bookObj = { author: author, isbn: isbn, title: title, books: [] };
  for (var i = 0; i < forReading; i++) {
    books.push(bookRead);
  }
  for (var i = 0; i < forIssue; i++) {
    books.push(bookIssue);
  }
  bookObj.books = books;
  Book.create(bookObj, (err, result) => {
    if (err) {
      response.msg = "FAILURE";
      res.status(501).json(response);
    } else {
      response.msg = "SUCCESS";
      res.json(response);
    }
  });
});

//updating a book
router.put("/books", tokenVerifierForAdmin, (req, res) => {
  let response = { msg: null, data: null };
  let { _id, author, isbn, title, forReading, forIssue } = req.body;
  books = [];
  bookRead = {
    status: 0,
    type: 1,
    issueId: null,
  };
  bookIssue = {
    status: 0,
    type: 2,
    issueId: null,
  };
  bookObj = { author: author, isbn: isbn, title: title };
  for (var i = 0; i < forReading; i++) {
    books.push(bookRead);
  }
  for (var i = 0; i < forIssue; i++) {
    books.push(bookIssue);
  }
  //   bookObj.books = books;
  Book.updateOne(
    { _id: _id },
    { $set: bookObj, $push: { books: books } },
    (err, doc) => {
      if (err) {
        response.msg = "FAILURE";
        res.status(501).json(response);
      } else {
        response.msg = "SUCCESS";
        res.json(response);
      }
    }
  );
});

router.put("/pullBooks", tokenVerifierForAdmin, async (req, res) => {
  let { mainBookId, childBookId } = req.body;
  let response = { msg: null, data: [] };
  Book.findOne({ _id: mainBookId }, (err, doc) => {
    if (doc.books.length == 1) {
      Book.deleteOne({ _id: childBookId }, (err, doc) => {
        if (err) {
          response.msg = err;
          res.status(501).json(response);
        } else {
          response.msg = "SUCCESS";
          res.json(response);
        }
      });
    } else if (doc.books.length > 1) {
      Book.updateOne(
        { _id: mainBookId },
        { $pull: { books: { _id: childBookId } } },
        (err, doc) => {
          if (doc) {
            response.msg = "SUCCESS";
            response.data = doc;
            res.json(response);
          } else {
            response.msg = "FAILURE";
            res.status(501).json(response);
          }
        }
      );
    } else {
      {
        response.msg = "FAILURE";
        res.status(501).json(response);
      }
    }
  });
});

//route for getting all books
router.get("/books", (req, res) => {
  let response = { msg: null, data: [] };
  Book.find(
    {},
    [],
    {
      $group: { _id: "$_id.isbn" },
    },
    (err, data) => {
      if (err) {
        response.msg = "Failure";
        res.status(501).json(response);
      } else {
        response.msg = "Success";
        if (data.length > 0) {
          data.forEach((doc) => {
            var d = [doc.title, doc.author, doc.isbn, doc["_id"]];
            response.data.push(d);
          });
          // response.data = data;
          res.json(response);
        } else {
          response.data = [];
          res.json(response);
        }
      }
    }
  );
});

//route for getting single book details
router.get("/books/:id", (req, res) => {
  let { id } = req.params;
  let response = { msg: null, data: null };
  Book.findOne({ _id: id }, (err, doc) => {
    if (err) {
      response.msg = "FAILURE";
      res.status(501).json(response);
    } else {
      response.msg = "SUCCESS";
      response.data = doc;
      res.json(response);
    }
  });
});
router.get("/bookforedit/:id", async (req, res) => {
  var resp = await Book.findOne({ _id: req.params.id });
  // var resp = await book.find({},[],{ sort: { name: 1 }, skip: parseInt(req.query.start), limit: parseInt(req.query.length),$group:{"_id":'$_id.isbn'} })
  pdata = [];
  if (resp) {
    resp.books.forEach((doc) => {
      var status;
      if (doc.status == 0) status = "free";
      else if (doc.status == 1) status = "occupied";

      var type;
      if (doc.type == 1) type = "For Reading";
      else type = "For Issue";
      var d = [doc._id, type, status, doc["_id"]];
      pdata.push(d);
    });
    res.json({
      recordsTotal: 2,
      recordsFiltered: 2,
      data: pdata,
      draw: req.query.draw,
    });
  } else {
    res.json({ status: false });
  }
});

//route for checking a book with isbn
router.get("/bookByISBN/:id", (req, res) => {
  let { isbn } = req.params;
  Book.countDocuments({ isbn: isbn }, (err, doc) => {
    console.log(doc);
    if (doc > 0) res.json({ status: "Present" });
    else if (doc == 0) res.json({ status: "NotPresent" });
    else {
      res.json({ msg: "Server error" });
      console.log(err);
    }
  });
});

router.get("/newBooks", async (req, res) => {
  let response = { msg: "FAILURE", data: null };
  var d = new Date();
  d.setDate(d.getDate() - 1);

  const data = await Book.find({ created_at: { $gte: d } });
  if (data) {
    response.msg = "SUCCESS";
    response.data = data;
    res.json(response);
  } else {
    res.json(response);
  }
});

module.exports = router;
