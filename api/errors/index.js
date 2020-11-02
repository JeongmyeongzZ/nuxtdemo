import { errorBag } from "~/lang";

const translateErrorMessage = error => {
  if (error.response.status === 400) {
    return errorBag[error.response.data.errors.type][error.response.data.errors.code];
  }

  return errorBag['http'][error.response.status] || errorBag['http']['fallback'];
};

class HttpError extends Error {
  constructor(error) {
    super(translateErrorMessage(error));
    this.cause = error;
    this.statusCode = error.response.status;
  }
}

class AuthenticationError extends HttpError {
  constructor(error) {
    super(...error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
  }
}

class AuthorizationError extends HttpError {
  constructor(error) {
    super(...error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationError);
    }
  }
}

class BadRequestError extends HttpError {
  constructor(error) {
    super(error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

class ConflictError extends HttpError {
  constructor(error) {
    super(error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }
  }
}

class NotfoundError extends HttpError {
  constructor(error) {
    super(error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotfoundError);
    }
  }
}

class ValidationError extends HttpError {
  constructor(error) {
    super(error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

class ServerError extends HttpError {
  constructor(error) {
    super(error);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }
}

export {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  ConflictError,
  NotfoundError,
  ValidationError,
  ServerError,
};
