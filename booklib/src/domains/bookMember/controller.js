const BookMember = require("./model");
const Member = require("../member/model");
const Book = require("../book/model");

const asyncCatch = require("./../../utils/asyncCatch");

const createBookMember = asyncCatch(async (req, res) => {
  /* 	
		#swagger.tags = ['Book Member']
    #swagger.description = 'Endpoint to create book member'
	*/

  /*
		#swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new book member',
      required: true,
      schema: { $ref: "#/definitions/createBookMember" }
    } 
	*/
  const { memberId, bookId } = req.body;
  const findBook = await Book.findById(bookId);
  if (findBook.stock === 0) {
    return res.respond({
      statusCode: 400,
      message: "Book Unavailable",
    });
  }
  const findMember = await Member.findById(memberId);
  if (findMember.isPenalty) {
    const updatedAt = findMember.updatedAt;
    const updateTime = new Date(
      updatedAt.getFullYear(),
      updatedAt.getMonth(),
      updatedAt.getDate()
    ).getTime();
    const currentDate = new Date().toISOString().split("T")[0];
    const newDate = new Date(currentDate).getTime();
    const diffTime = newDate - updateTime;
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    if (diffDays < 4) {
      return res.respond({
        statusCode: 401,
        message: "You can't borrow the book at this time",
      });
    }
    await Member.updateOne(
      { _id: memberId },
      { $set: { isPenalty: false }, $inc: { borrowBook: 1 } }
    );
  } else {
    await Member.updateOne({ _id: memberId }, { $inc: { borrowBook: 1 } });
  }
  const existBookMember = await BookMember.findOne({ memberId, bookId });
  let book = {};
  if (existBookMember) {
    if (existBookMember.isReturn) {
      book = await BookMember.updateOne(
        { memberId, bookId },
        { $set: { isReturn: false, borrowDate: new Date() } }
      );
    } else {
      return res.respond({
        statusCode: 200,
        message: "You haven't return the book",
      });
    }
  } else {
    book = await BookMember.create({ ...req.body, borrowDate: new Date() });
  }
  await Book.updateOne({ _id: bookId }, { $inc: { stock: -1 } });
  return res.respond({
    statusCode: 200,
    message: "Successfully Add Data",
    data: book,
  });
});

const updateBookMember = asyncCatch(async (req, res) => {
  /* 	
		#swagger.tags = ['Book Member']
    #swagger.description = 'Endpoint to update book member'
	*/

  /*
		#swagger.parameters['obj'] = {
      in: 'body',
      description: 'Update existing book member',
      required: true,
      schema: { $ref: "#/definitions/updateBookMember" }
    } 
	*/
  const { memberId, bookId, returnDate } = req.body;
  const existBookMember = await BookMember.findOne({ memberId, bookId });
  const borrowDate = existBookMember.borrowDate;
  const oldDate = new Date(
    borrowDate.getFullYear(),
    borrowDate.getMonth(),
    borrowDate.getDate()
  ).getTime();
  const newDate = new Date(returnDate).getTime();
  const diffTime = newDate - oldDate;
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  if (diffDays > 7) {
    await Member.updateOne(
      { _id: memberId },
      { $set: { isPenalty: true }, $inc: { borrowBook: -1 } }
    );
  } else {
    await Member.updateOne({ _id: memberId }, { $inc: { borrowBook: -1 } });
  }
  await Book.updateOne({ _id: bookId }, { $inc: { stock: 1 } });
  await BookMember.updateOne(
    { memberId, bookId },
    { $set: { isReturn: true } }
  );
  return res.respond({
    statusCode: 200,
    message: "Successfully Update Data",
    data: existBookMember,
  });
});

module.exports = { createBookMember, updateBookMember };
