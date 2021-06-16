/**
 * Created on 2021/03/30.
 */
import * as types from './mutation-types';

const mutations = {
  // 测试用
  [types.SET_FETCH_DATA](state, collapsed) {
    state.fetchData = collapsed;
  },
};

export default mutations;
