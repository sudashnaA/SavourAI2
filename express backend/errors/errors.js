class CustomNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 404;
      // So the error is neat when stringified. NotFoundError: message instead of Error: message
      this.name = "NotFoundError";
    }
}

class CustomUnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    // So the error is neat when stringified. NotFoundError: message instead of Error: message
    this.name = "UnauthorisedError";
  }
}

class CustomBadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    // So the error is neat when stringified. NotFoundError: message instead of Error: message
    this.name = "UnauthorisedError";
  }
}
  
module.exports = { CustomNotFoundError, CustomUnauthorisedError, CustomBadRequestError };