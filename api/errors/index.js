const translateErrorMessage = error => {
  switch (error.response) {
    case 401:
      return '인증되지 않은 유저입니다.';
    case 403:
      return '접근 권한이 않습니다.';
    case 404:
      return '페이지를 찾을 수 없습니다.';
    case 422:
      return '잘못된 요청입니다, 관리자에게 문의하세요.';
    default:
      return '현재 시스템을 사용할 수 없습니다, 관리자에게 문의하세요.';
  }
};

class HttpError extends Error {
  constructor(error) {
    super(translateErrorMessage(error));
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
