export class APIError extends Error {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor.name);
    this.name = this.constructor.name;
    this.message = message || "Something went wrong.";
    this.status = status || 500;
  }
}

export class QuotaLimitExceededError extends APIError {
  constructor(message, status) {
    super(
      message || "You have exceeded your API Quota Limit. Please wait.",
      status || 429
    );
  }
}

export class MongoError extends APIError {
  constructor(message, status) {
    super(
      message || "Some error occured, please try again later",
      status || 400
    );
  }
}

export class UserNotFoundError extends APIError {
  constructor(message, status) {
    super(message || "User doesn't exists", status || 404);
  }
}

export class UserUpdateError extends APIError {
  constructor(message, status) {
    super(message || "User doesn't exists", status || 400);
  }
}

export class UserNotAuthorizedError extends APIError {
  constructor(message, status) {
    super(message || "Incorrect email or password", status || 401);
  }
}
