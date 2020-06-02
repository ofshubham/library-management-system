const Book = require("../db/models/Book");
const Member = require("../db/models/Member");

function userHistoryFormatter(userHistory) {
  return new Promise((resolve, reject) => {
    if (userHistory.length > 0) {
      var data = [];
      userHistory.forEach(async (e) => {
        var bookDetail = await Book.findOne({ _id: e.bookId });
        data.push([
          bookDetail.title,
          e.issueDate.toString(),
          e.returnDate.toString(),
          e.userId,
          e._id,
        ]);
        if (userHistory.length == data.length) {
          resolve(data);
        }
      });
    } else resolve([]);
  });
}
function historyFormatter(history) {
  return new Promise((resolve, reject) => {
    if (history.length > 0) {
      var data = [];
      history.forEach(async (e) => {
        var bookDetail = await Book.findOne({ _id: e.bookId });
        var memberDetail = await Member.findOne({ _id: e.userId });
        data.push([
          bookDetail.title,
          e.issueDate.toString(),
          memberDetail.name,
          e.returnDate.toString(),
          e.userId,
          e._id,
        ]);
        if (history.length == data.length) {
          resolve(data);
        }
      });
    } else resolve([]);
  });
}

function formatIssuedBookDetails(issuedBooksData) {
  return new Promise((resolve, reject) => {
    if (issuedBooksData.length > 0) {
      var data = [];
      issuedBooksData.forEach(async (e) => {
        var memberdetail = await Member.findOne({ _id: e.userId });
        var bookdetail = await Book.findOne({ _id: e.mainBookId });
        data.push([
          bookdetail.title,
          e.issueDate.toString(),
          memberdetail.name,
          e.mainBookId,
          e.userId,
          e._id,
        ]);
        if (issuedBooksData.length == data.length) {
          resolve(data);
        }
      });
    }
  });
}

function formatIssueddata(issudetails) {
  return new Promise((resolve, reject) => {
    if (issudetails.length > 0) {
      var data = [];
      issudetails.forEach(async (e) => {
        var bookdetail = await Book.findOne({ _id: e.mainBookId });
        data.push([
          bookdetail.title,
          e.issueDate.toString(),
          e.requestedDays,
          e._id,
        ]);
        if (issudetails.length == data.length) {
          resolve(data);
        }
      });
    }
  });
}
function issueDetailFormatter(issueData) {
  return new Promise((resolve, reject) => {
    if (issueData.length > 0) {
      var data = [];
      issueData.forEach(async (e) => {
        var memberdetail = await Member.findOne({ _id: e.memberId });
        var bookdetail = await Book.findOne({ _id: e.bookId });
        data.push([
          bookdetail.title,
          memberdetail.name,
          e.requestDateTime.toString(),
          e.requestedDays,
          e.bookId,
          e.memberId,
          e._id,
        ]);
        if (issueData.length == data.length) {
          resolve(data);
        }
      });
    }
  });
}
module.exports = {
  userHistoryFormatter,
  historyFormatter,
  formatIssuedBookDetails,
  formatIssueddata,
  issueDetailFormatter,
};
