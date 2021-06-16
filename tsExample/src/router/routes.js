const config = [
  {
    path: '/',
    name: 'home',
    redirect: '/admin/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: 'pages/User/Login',
  },
  {
    path: '/exception/:status',
    name: 'exception',
    component: 'pages/Exception/index.vue',
  },
  {
    path: '/admin',
    name: 'admin',
    component: 'layouts/AdminLayout',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/admin/dashboard',
        name: 'adminDashboard',
        component: 'pages/Admin/Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-discover',
        },
      },
      {
        path: '/admin/profile',
        name: 'adminProfile',
        component: 'pages/Admin/Profile',
        meta: {
          title: '基础模板',
          icon: 'el-icon-receiving',
        },
        children: [
          {
            path: '/admin/profile/sfc',
            name: 'adminProfileSFC',
            component: 'pages/Admin/Profile/BasicSFC',
            meta: {
              title: 'SFC 组件',
            },
          },
          {
            path: '/admin/profile/jsx',
            name: 'adminProfileJSX',
            component: 'pages/Admin/Profile/BasicJSX',
            meta: {
              title: 'JSX 组件',
            },
          },
          {
            path: '/admin/profile/tsx',
            name: 'adminProfileTSX',
            component: 'pages/Admin/Profile/BasicTSX',
            meta: {
              title: 'TSX 组件',
            },
          },
        ],
      },
      {
        path: '/exception',
        name: 'exceptionLink',
        meta: {
          title: '异常页',
          icon: 'el-icon-warning-outline',
        },
        children: [
          {
            path: '/exception/403',
            name: 'exceptionLink403',
            meta: {
              title: '403',
            },
          },
          {
            path: '/exception/404',
            name: 'exceptionLink404',
            meta: {
              title: '404',
            },
          },
          {
            path: '/exception/500',
            name: 'exceptionLink500',
            meta: {
              title: '500',
            },
          },
        ],
      },
      {
        path: '/admin/example',
        name: 'adminExample',
        component: 'pages/Admin/Example',
        meta: {
          title: '示例',
          icon: 'el-icon-orange',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/exception/404',
  },
];

export const routesConfig = config;
