import { serverSideRequest } from "~/api";
import { getField, updateField } from 'vuex-map-fields';

const user = {
  id: null,
  username: null,
  password: null,
  name: null,
  contactInformation: {
    email: null,
    phoneNumber: null,
    extensionNumber: null,
  },
  role: {
    team: null,
    position: null,
    citiesInCharge: [],
  },
};

export const state = () => ({
  userList: null,
  user: user,
});

export const getters = {
  getField,
};

export const mutations = {
  SET_USER_LIST: function(state, data) {
    state.userList = data;
  },

  SET_USER: function(state, data) {
    state.user = Object.assign({}, user, data);
  },

  RESET_USER(state) {
    state.user = Object.assign({}, user);
  },

  updateField,
};

export const actions = {
  async getUserList({ commit }) {
    const response = await this.$axios.get(); serverSideRequest(this.$api.user.getUserList)();

    if (! response) {
      return;
    }

    commit('SET_USER_LIST', response.data);
  },
  async getUser({ commit }, payload) {
    commit('RESET_USER');

    const response = await serverSideRequest(this.$api.user.getUser)(payload);

    if (! response) {
      return;
    }

    commit('SET_USER', response.data);
  },
  async getMe({ commit }) {
    commit('RESET_USER');

    const response = await serverSideRequest(this.$api.user.getMe)();

    if (! response) {
      return;
    }

    commit('SET_USER', response.data);
  },

  async resetUser({ commit }) {
    commit('RESET_USER');
  },

  async createUser({ state }) {
    const { ...payload } = state.user;
    delete(payload.id);

    await serverSideRequest(this.$api.user.createUser)(payload);
  },


  async updateUser({ state }) {
    const { id, ...payload} = state.user;

    await serverSideRequest(this.$api.user.updateUser)({
      id: id,
    }, payload);
  },

  async updateMe({ state }) {
    const { ...payload } = state.user;
    delete(payload.id);

    await serverSideRequest(this.$api.user.updateMe)(payload);
  },
};
