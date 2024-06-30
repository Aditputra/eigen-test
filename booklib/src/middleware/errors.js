const { CustomError } = require("./../errors/customErrors");

const handleError = (error, _req, res, _next) => {
  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? error
    : {
        message: "Something went wrong",
        code: "INTERNAL_ERROR",
        statusCode: 500,
        data: {},
      };

  res.status(clientError.statusCode).send(clientError);
};

module.exports = { handleError };
