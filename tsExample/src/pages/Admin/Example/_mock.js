/**
 * _mock.js 请按照 AMD 规范进行编写
 * 请勿使用 import
 */
// const mockjs = require('mockjs');

const waitTime = (time) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, Number(time) + 600);
  });

exports.default = {
  'POST /api/example/a': async (req = {}, res) => {
    const { body = {} } = req;
    const { type, value = 0 } = body;
    await waitTime(Math.random() * 900);
    res.send({
      data: {
        value,
        type,
      },
      timestamp: +new Date(),
    });
  },
  'POST /api/example/b': async (req = {}, res) => {
    const { body = {} } = req;
    const { type, value = 0 } = body;
    await waitTime(Math.random() * 900);
    res.send({
      data: {
        value,
        type,
      },
      timestamp: +new Date(),
    });
  },
  'POST /api/example/c': async (req = {}, res) => {
    const { body = {} } = req;
    const { type, value = 0 } = body;
    await waitTime(Math.random() * 900);
    res.send({
      data: {
        value,
        type,
      },
      timestamp: +new Date(),
    });
  },
  'POST /api/example/d': async (req = {}, res) => {
    const { body = {} } = req;
    const { type, value = 0 } = body;
    await waitTime(Math.random() * 900);
    res.send({
      data: {
        value,
        type,
      },
      timestamp: +new Date(),
    });
  },
};
