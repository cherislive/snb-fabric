/* eslint-disable */
// https://router.vuejs.org/api/#router-addroute
export const setRoutes = (
  _router: Record<string, any>,
  _ROUTES: Record<string, any>,
  parentName?: string,
) => {
  if (!_router) return;
  _ROUTES.map((item) => {
    const { path, name, meta = {}, component, redirect, children } = item || {};
    const nextItem = {
      ...item,
    };
    if (component) {
      // nextItem.component = () => import(`../${item.component}`);
      // item.component = (resolve) => require([`/src/${component}`], resolve);
      nextItem.component = () => import(`@/${component}`);
      nextItem.meta = {
        ...meta,
        pagePath: component,
      };
    }
    if (redirect && !name) {
      nextItem.name = `__redirect${String(path).split('/').join('')}_${String(redirect)
        .split('/')
        .join('')}`;
    }
    nextItem.children = null;
    if (parentName) {
      _router.addRoute(parentName, nextItem);
    } else {
      _router.addRoute(nextItem);
    }
    if (children && children.length) {
      setRoutes(_router, children || [], name);
    }
  });
};

export default {
  setRoutes,
};
