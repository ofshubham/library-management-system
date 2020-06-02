const mongoose = require("../connection");
const Schema = mongoose.Schema;
const userHistorySchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

module.exports = UserHistory;
