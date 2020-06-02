const mongoose = require("../connection");
const Schema = mongoose.Schema;

const issueRequestSchema = Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  requestDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  requestedDays: {
    type: Number,
    required: true,
  },
});

let Request = mongoose.model("Request", issueRequestSchema);
module.exports = Request;
