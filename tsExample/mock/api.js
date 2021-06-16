const mockjs = require('mockjs');

const waitTime = (time) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, time);
  });
};

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: +new Date(),
    user: {
      name: '张三丰',
    },
    group: {
      name: 'github',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
  },
];

exports.default = {
  // 'GET /api/global/activities': getActivities,
  'GET /api/global/activities': async (req = {}, res) => {
    const { query = {} } = req;
    await waitTime(Math.random() * 900);
    res.send({
      timestamp: +new Date(),
      ...query,
      a: '12312323',
      data: getActivities,
    });
  },
  'POST /api/global/forms': async (_, res) => {
    await waitTime(Math.random() * 900);
    res.send({ message: 'Ok' });
  },
  'GET /api/global/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'POST /api/user/account': async (req, res) => {
    const { password, userName } = req.body;
    await waitTime(2000);
    if (userName === 'admin' && password === '123456') {
      res.send({
        status: 'ok',
        code: 200,
        currentAuthority: ['admin'],
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        code: 200,
        currentAuthority: ['user'],
      });
      return;
    }
    res.send({
      status: 'error',
      code: 9001,
      message: '用户名或密码错误',
      currentAuthority: ['guest'],
    });
  },
};
