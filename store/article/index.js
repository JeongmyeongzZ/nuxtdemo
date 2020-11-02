import { serverSideRequest, clientSideRequest } from "~/api";
import { getField, updateField } from 'vuex-map-fields';

const article = {
  id: null,
  title: null,
  content: null,
};

export const state = () => ({
  articleList: null,
  article: article,
});

export const getters = {
  getField,
};

export const mutations = {
  SET_ARTICLE_LIST: function(state, data) {
    state.articleList = data;
  },

  SET_ARTICLE: function(state, data) {
    state.article = Object.assign({}, article, data);
  },

  RESET_ARTICLE(state) {
    state.article = Object.assign({}, article);
  },

  updateField,
};

export const actions = {
  async getArticleList({ commit }) {
    const response = await serverSideRequest(this.$api.article.getArticleList)();

    if (! response) {
      return;
    }

    commit('SET_ARTICLE_LIST', response.data);
  },
  async getArticle({ commit }, payload) {
    commit('RESET_ARTICLE');

    const response = await serverSideRequest(this.$api.article.getArticle)(payload);

    if (! response) {
      return;
    }

    commit('SET_ARTICLE', response.data);
  },

  async createArticle({ state }) {
    const { ...payload } = state.article;
    delete(payload.id);

    await clientSideRequest(this.$api.article.createArticle)(payload);
  },


  async updateArticle({ state }) {
    const { id, ...payload} = state.article;

    await clientSideRequest(this.$api.article.updateArticle)({
      id: id,
    }, payload);
  },
};
