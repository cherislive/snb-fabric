const path = require('path');
const createMock = require('snb-mock-middleware');

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  },
  css: {
    // modules: true,
    requireModuleExtension: true,
  },
  productionSourceMap: false,
  devServer: {
    hot: true,
    overlay: {
      warnings: false,
      errors: false,
    },
    before: (app) => {
      app.use(
        createMock({
          cwd: path.join(__dirname, '/'),
        }),
      );
    },
    // /**
    //  * 在 webpack-dev-server 定义额外的中间件
    //  * @param {*} app 一个express应用程序
    //  */
    // before(app) {
    //   app.get('/some/path', (req, res) => {
    //     const { url, query, body } = req;
    //     res.status(200).send({ url, query, body });
    //     // res.json({ data: '' });
    //     // res.send(data);
    //     // res.status(200 | 500 | 401 | 403 | 404);
    //     // res.status(401).send(data);
    //   });
    // },
    port: 8091,
    https: false,
    open: true,
    proxy: {
      '/api/': {
        target: 'your pre url',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
  },
};
