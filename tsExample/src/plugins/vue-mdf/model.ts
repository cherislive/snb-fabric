/**
 * model 按需注入
 */

// 开发环境 待优化
const isDev = false; // process.env.NODE_ENV === 'development';
let nextStore: Record<string, any>;

// 加载 Module 必要性判断
const needlessModel = (namespace: string) => {
  // eslint-disable-next-line no-underscore-dangle
  const __GLOBAL_S_MODULE = window.__GLOBAL_S_MODULE || [];
  // eslint-disable-next-line no-underscore-dangle
  return !isDev && (nextStore.hasModule(namespace) || __GLOBAL_S_MODULE.includes(namespace));
};

// 获取 Model 的 nameSpace
const getNameSpace = (pagePath: unknown) => {
  if (!pagePath) return '__empty';
  const pagePathArr = Array.isArray(pagePath) ? pagePath : String(pagePath).split('/');
  return pagePathArr
    .map((item: Record<string, any>, index: number) => {
      let charFirst = item.charAt(0);
      charFirst = index === 0 ? charFirst.toLowerCase() : charFirst.toUpperCase();
      return charFirst + item.slice(1);
    })
    .join('');
};

/**
 * 挂载 Module
 * @param {*} namespace Module 命名空间
 * @param {*} model Module 主体
 */
const registerModule = (namespace: string, model: Record<string, any>) => {
  // eslint-disable-next-line no-underscore-dangle
  const __GLOBAL_S_MODULE = window.__GLOBAL_S_MODULE || [];
  const activeNameSpace = model.namespace || namespace;
  // Module 非必要挂载
  if (needlessModel(activeNameSpace)) return;
  nextStore.registerModule(activeNameSpace, {
    ...model,
    namespaced: true,
  });
  // eslint-disable-next-line no-underscore-dangle
  __GLOBAL_S_MODULE.push(activeNameSpace);
  // 这里 保存 系统计算的 namespace 避免资源重复加载
  // eslint-disable-next-line no-underscore-dangle
  __GLOBAL_S_MODULE.push(namespace);
  // eslint-disable-next-line no-underscore-dangle
  window.__GLOBAL_S_MODULE = __GLOBAL_S_MODULE;
};

/**
 * 获取Model 容器
 * @param namespace 命名空间
 * @param pagePath Model 文件路径
 */
const fetchModule = async (namespace: string, pagePath: string) => {
  /* eslint-disable */
  await Promise.resolve(import(`/src/${pagePath}/model`))
    .then((modelContent = {}) => {
      const { default: model = {} } = modelContent;
      if (model.state) {
        if (isDev) model.preserveState = true;
        registerModule(namespace, model);
      }
    })
    .catch(() => {});
  /* eslint-disable */
};

/**
 * 创建 Model
 * @param {*} route 路由参数 { name, meta: pagePath }
 */
const modelCreate = async (store: Record<string, any> = {}, route: Record<string, any> = {}) => {
  nextStore = store;
  const { name: defNamespace, meta = {} } = route;
  const { pagePath } = meta;
  const namespace = defNamespace || getNameSpace(pagePath);
  if (!pagePath) return;
  // Module 非必要挂载
  if (needlessModel(namespace)) return;
  const pagePathArr = pagePath.split('/');
  const pagePathDeep = pagePathArr.length;
  // 自动匹配父级 module
  if (pagePathDeep > 2) {
    for (let i = 0; i < pagePathDeep - 2; i += 1) {
      const nextNameSpace = getNameSpace(pagePathArr.slice(1, 2 + i));
      const nextPagePath = pagePathArr.slice(0, 2 + i).join('/');
      if (!nextStore.hasModule(nextNameSpace)) {
        // 获取Model 容器
        await fetchModule(nextNameSpace, nextPagePath);
      }
    }
  }
  // 获取Model: 容器 当前 路由页面下的 Model 匹配
  await fetchModule(namespace, pagePath);
};
export default modelCreate;
