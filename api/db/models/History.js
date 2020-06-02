const mongoose = require("../connection");
const Schema = mongoose.Schema;

const historySchema = new Schema({
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

let History = mongoose.model("History", historySchema);
module.exports = History;
