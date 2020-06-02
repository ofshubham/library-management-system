const mongoose = require("../connection");
const Schema = mongoose.Schema;
var issuedSchema = new Schema({
  mainBookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  issuedBookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  requestedDays: {
    type: Number,
    required: true
  },
  issueDate: {
    type: Date,
    required: true,
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

let Issued = mongoose.model("Issued", issuedSchema);

module.exports = Issued;
