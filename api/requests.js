import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  ConflictError,
  NotfoundError,
  ServerError,
  ValidationError
} from "~/api/errors";

const reporters = {
  $sentry: null,
};

const registerSentry = ($sentry) => {
  reporters.$sentry = $sentry;
};

const prepareError = error => {
  const status = error?.response?.status;

  if (! status) {
    return error;
  }

  if (status === 400) {
    return new BadRequestError(error);
  }

  if (status === 401) {
    return new AuthenticationError(error);
  }

  if (status === 403) {
    return new AuthorizationError(error);
  }

  if (status === 404) {
    return new NotfoundError(error);
  }

  if (status === 419) {
    return new ConflictError(error);
  }

  if (status === 422) {
    return new ValidationError(error);
  }

  return new ServerError(error);
};

const shouldReport = error => {
  return ! (
    error instanceof AuthenticationError
    || error instanceof AuthorizationError
    || error instanceof BadRequestError
    || error instanceof ConflictError
    || error instanceof NotfoundError
  );
};

const report = error => {
  try {
    reporters.$sentry.captureException(error);
  } catch(e) {
    //
  }
};

const clientSideRequest = requestCallback => async (...params) => {
  try {
    const response = await requestCallback(...params);

    if (response) {
      return response.data;
    }
  } catch (error) {
    const preparedError = prepareError(error);

    if (shouldReport(preparedError)) {
      report(preparedError);
    }

    throw preparedError;
  }
};

const serverSideRequest = requestCallback => async (...params) => {
  try {
    const response = await requestCallback(...params);
    return response.data;
  } catch (error) {
    const preparedError = prepareError(error);

    if (shouldReport(preparedError)) {
      report(preparedError);
    }

    return false;
  }
};

export {
  clientSideRequest,
  serverSideRequest,
  registerSentry,
};
