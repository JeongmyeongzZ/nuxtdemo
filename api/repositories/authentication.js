const authentication = {
  login: {
    method: 'post',
    url: '/login',
  },
  refresh: {
    method: 'post',
    url: '/oauth/token/refresh',
  },
};

const authenticationRepository = client => ({
  login: payload => client[authentication.login.method](authentication.login.url, payload),
  refresh: () => client[authentication.refresh.method](authentication.refresh.url),
});

export {
  authentication,
  authenticationRepository,
};
