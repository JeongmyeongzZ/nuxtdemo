import Vue from "vue";
import api from '~/api';
import { registerSentry } from "~/api";

export default ({ $axios, $sentry }, inject) => {
  registerSentry($sentry);
  const $api = api($axios);
  Vue.prototype.$api = $api;
  inject('api', $api);
};
