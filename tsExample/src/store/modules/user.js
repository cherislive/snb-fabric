import router from '@/router';
import { fetchInfo, fetchUserInfo } from '@/services';
// import { setAuthority } from '@/utils/authority';

const state = {
  fetchData: null,
  userInfo: {},
};
const getters = {
  fetchData: (state) => state.fetchData,
};
const actions = {
  async fetch({ commit }) {
    const res = await fetchInfo('g/user');
    commit('SET_FETCH_DATA', res);
  },
  async login({ commit }, data) {
    const res = await fetchUserInfo(data);
    // setAuthority(res.currentAuthority);
    router.push({ path: '/' });
    commit('SET_USERINFO', res);
  },
};
const mutations = {
  SET_FETCH_DATA: (state, data) => {
    state.fetchData = data;
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data;
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
