const article = {
  getArticleList: {
    method: 'get',
    url: '/api/articles',
  },
  getArticle: {
    method: 'get',
    url: ({ id }) => `api/articles/${id}`,
  },
  createArticle: {
    method: 'post',
    url: '/api/articles',
  },
  updateArticle: {
    method: 'put',
    url: ({ id }) => `/articles/${id}`,
  },
};

const articleRepository = client => ({
  // getArticleList: () => client[article.getArticleList.method](article.getArticleList.url),
  getArticleList: () => client[article.getArticleList.method](article.getArticleList.url),
  getArticle: route => client[article.getArticle.method](article.getArticle.url(route)),
  createArticle: payload => client[article.createArticle.method](article.createArticle.url, payload),
  updateArticle: (route, payload) => client[article.updateArticle.method](article.updateArticle.url(route), payload),
});

export {
  article,
  articleRepository,
};
