import loadingEffect from './loading';
import modelCreate from './model';
import { setRoutes } from './utils';

export type vueModelType = {
  installed: boolean;
  vm: Record<string, any>;
  init: () => void;
  install?: (Vue: Record<string, any>, instance: Record<string, any>) => void;
};

const vueModel: vueModelType = {
  installed: false,
  vm: {},
  init() {
    if (!this.installed) {
      // eslint-disable-next-line no-console
      console.warn(
        `[vue-wait] not installed. Make sure to call \`Vue.use(VueWait)\` before init root instance.`,
      );
    }
  },
  // eslint-disable-next-line no-unused-vars
  install(_, instance: Record<string, any> = {}) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install model');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('install model.');

    const { router, store, routesConfig } = instance;
    // 注入 LoadingEffect
    loadingEffect(store);

    // 注入 路由拦截器
    router.beforeResolve(async (to, _, next) => {
      await modelCreate(store, to); // model 按需注入
      next();
    });

    if (routesConfig) {
      setRoutes(router, routesConfig);
      router.config = routesConfig;
    }

    // Object.defineProperties(Vue.prototype, {
    // })
  },
};

export default vueModel;
