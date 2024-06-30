class CustomError extends Error {
  constructor(message, code = "INTERNAL_ERROR", statusCode = 500, data = {}) {
    super();
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

class RouteNotFoundError extends CustomError {
  constructor(originalUrl) {
    super(`Route '${originalUrl}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

class BadUserInputError extends CustomError {
  constructor(errorData) {
    super("There were validation errors.", "BAD_USER_INPUT", 400, errorData);
  }
}

module.exports = { CustomError, RouteNotFoundError, BadUserInputError };
