import { fetchInfo } from '../service';

const profileModel = {
  // model 的命名空间，建议用户自定义
  namespace: 'profile',
  state: {
    fetchData: null,
  },
  getters: {
    fetchData: (state) => state.fetchData,
  },
  actions: {
    async fetch({ commit }, data) {
      const res = await fetchInfo(data);
      commit('SET_FETCH_DATA', res);
      return res;
    },
  },
  mutations: {
    SET_FETCH_DATA: (state, data) => {
      state.fetchData = data;
    },
  },
};
export default profileModel;
