const mongoose = require("../connection");
const Schema = mongoose.Schema;

function nDaysFromNow(n) {
  console.log("n", n);
  let timeObject = new Date();
  timeObject.setDate(timeObject.getDate() + n - 1);
  return timeObject;
}
const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  membershipdays: {
    type: Number,
    required: true,
  },
  membershiphours: {
    type: Number,
    required: true,
  },
  membershipexpire: {
    type: Date,
    required: true,
    default: function () {
      return nDaysFromNow(this.membershipdays);
    },
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
