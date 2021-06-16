/**
 * _mock.js 请按照 AMD 规范进行编写
 * 请勿使用 import
 */
const Mock = require('mockjs');
// const path = require('path');

const waitTime = (time) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, time);
  });

exports.default = {
  'POST /api/profile/info': async (_, res) => {
    await waitTime(Math.random() * 900);
    res.send({
      message: 'Ok',
      timestamp: +new Date(),
      data: Mock.mock({
        'list|10': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
      }),
    });
  },
};
