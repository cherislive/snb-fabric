import {
  fetchA, fetchB, fetchC, fetchD,
} from './service';

const BasicSFCModel = {
  // model 的命名空间，建议用户自定义
  namespace: 'example',
  state: {
    infoA: {},
    infoB: {},
    infoC: {},
    infoD: {},
  },
  getters: {
    infoA: (state) => state.infoA,
    infoB: (state) => state.infoB,
    infoC: (state) => state.infoC,
    infoD: (state) => state.infoD,
  },
  actions: {
    async fetchA({ commit }, data) {
      const res = await fetchA(data);
      commit('SET_FETCH_DATA_A', res);
      return res;
    },
    async fetchB({ commit }, data) {
      const res = await fetchB(data);
      commit('SET_FETCH_DATA_B', res);
      return res;
    },
    async fetchC({ commit }, data) {
      const res = await fetchC(data);
      commit('SET_FETCH_DATA_C', res);
      return res;
    },
    async fetchD({ commit }, data) {
      const res = await fetchD(data);
      commit('SET_FETCH_DATA_D', res);
      return res;
    },
  },
  mutations: {
    SET_FETCH_DATA_A: (state, data) => {
      state.infoA = data;
    },
    SET_FETCH_DATA_B: (state, data) => {
      state.infoB = data;
    },
    SET_FETCH_DATA_C: (state, data) => {
      state.infoC = data;
    },
    SET_FETCH_DATA_D: (state, data) => {
      state.infoD = data;
    },
  },
};
export default BasicSFCModel;
