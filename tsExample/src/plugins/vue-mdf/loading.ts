/**
 * 数据流 状态管理器
 * 用于 在业务中 对于 action 请求的状态管理
 * @param {*} namespace
 * @returns
 */
const loadingEffect = (
  store: Record<string, any>,
  { namespace = '@@loading', includes = [], excludes = [] } = {},
) => {
  if (store.state[namespace]) {
    // console.warn(`loadingEffect: ${namespace} exited in current store`);
    return;
  }
  const shouldEffect = ({ type }: Record<string, any>, includes: any[], excludes: any[]) => {
    if (includes.length === 0 && excludes.length === 0) {
      return true;
    }
    if (includes.length > 0) {
      return includes.indexOf(type) > -1;
    }
    return excludes.length > 0 && excludes.indexOf(type) === -1;
  };

  const state = {
    global: false,
    effects: {},
  };
  const mutations = {
    SET_IN_LOADING(state: Record<string, any>, { payload, loading }: Record<string, any>) {
      state.global = true;
      state.effects = {
        ...state.effects,
        [payload]: loading,
      };
    },
  };
  store.registerModule(namespace, {
    namespaced: true,
    state,
    mutations,
  });

  store.subscribeAction({
    before: (action: Record<string, any>) => {
      if (shouldEffect(action, includes, excludes)) {
        store.commit({
          type: `${namespace}/SET_IN_LOADING`,
          payload: action.type,
          loading: true,
        });
      }
    },
    after: (action: Record<string, any>) => {
      if (shouldEffect(action, includes, excludes)) {
        store.commit({
          type: `${namespace}/SET_IN_LOADING`,
          payload: action.type,
          loading: false,
        });
      }
    },
  });
};

export default loadingEffect;
