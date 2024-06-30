const Book = require("./model");

const asyncCatch = require("./../../utils/asyncCatch");

const getBook = asyncCatch(async (_req, res) => {
  /* 
		#swagger.tags = ['Book']
    #swagger.description = 'Endpoint to get book'
	*/
  const books = await Book.find({ stock: { $gt: 0 } });

  return res.respond({
    statusCode: 200,
    message: "Successfully Get Data",
    data: books,
  });
});

const createBook = asyncCatch(async (req, res) => {
  /* 
		#swagger.tags = ['Book']
    #swagger.description = 'Endpoint to create book'
	*/

  /*	
		#swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new book',
      required: true,
      schema: { $ref: "#/definitions/createBook" }
    } 
	*/
  const book = await Book.create(req.body);
  return res.respond({
    statusCode: 200,
    message: "Successfully Add Data",
    data: book,
  });
});

module.exports = { getBook, createBook };
