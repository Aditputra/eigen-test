const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookMemberSchema = new Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
    },
    isReturn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BookMember = mongoose.model("BookMember", bookMemberSchema);

module.exports = BookMember;
