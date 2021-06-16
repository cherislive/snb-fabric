/**
 * @copyright
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as getters from './getters';
import state from './state';
import actions from './action';
import mutations from './mutations';

Vue.use(Vuex);
const files = require.context('./modules', false, /\.js$/);
const modules = {};
const plugins = [];

const debug = process.env.NODE_ENV;
if (debug) {
  plugins.push(createLogger());
}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key].namespaced = true;
});

const store = new Vuex.Store({
  getters,
  state,
  actions,
  mutations,
  strict: debug,
  plugins,
  modules,
});
export default store;
