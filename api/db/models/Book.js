const mongoose = require("../connection");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  books: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
      status: {
        type: Number,
        required: true,
      },
      type: {
        type: Number,
      },
      issueId: {
        type: Schema.Types.ObjectId,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;
