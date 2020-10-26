const user = {
  getUserList: {
    method: 'get',
    url: '/users',
  },
  getUser: {
    method: 'get',
    url: ({ id }) => `/users/${id}`,
  },
  getMe: {
    method: 'get',
    url: '/users/me',
  },
  createUser: {
    method: 'post',
    url: '/users',
  },
  updateUser: {
    method: 'patch',
    url: ({ id }) => `/users/${id}`,
  },
  updateMe: {
    method: 'patch',
    url: '/users/me',
  },
};

const userRepository = client => ({
  getUserList: () => client[user.getUserList.method](user.getUserList.url),
  getUser: route => client[user.getUser.method](user.getUser.url(route)),
  getMe: () => client[user.getMe.method](user.getMe.url),
  createUser: payload => client[user.createUser.method](user.createUser.url, payload),
  updateUser: (route, payload) => client[user.updateUser.method](user.updateUser.url(route), payload),
  updateMe: payload => client[user.updateMe.method](user.updateMe.url, payload),
});

export {
  user,
  userRepository,
};
