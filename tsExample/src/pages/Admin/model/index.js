import { fetchInfo, fetcException } from '../service';

const assetAdminModel = {
  // model 的命名空间，建议用户自定义
  namespace: 'admin',
  state: {
    fetchData: null,
  },
  getters: {
    fetchData: (state) => state.fetchData,
  },
  actions: {
    async fetch({ commit }) {
      const res = await fetchInfo('g/admin');
      commit('SET_FETCH_DATA', res);
    },
    async exception(_, data = {}) {
      await fetcException(data);
    },
  },
  mutations: {
    SET_FETCH_DATA: (state, data) => {
      state.fetchData = data;
    },
  },
};
export default assetAdminModel;
