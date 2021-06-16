/**
 * Created on 2021/03/30.
 */
import { fetchUserInfo } from '@/services';
import { SET_FETCH_DATA } from './mutation-types';

export default {
  async fetch({ commit }) {
    const res = await fetchUserInfo('global');
    commit(SET_FETCH_DATA, res);
  },
};
