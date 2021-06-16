/**
 * _mock.js 请按照 AMD 规范进行编写
 * 请勿使用 import
 */
// const Mock = require('mockjs');
const province = require('./geographic/province.json');

const waitTime = (time) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true);
      clearTimeout(timer);
    }, time);
  });

async function getProvince(_, res) {
  await waitTime(Math.random() * 900);
  return res.json(province);
}

exports.default = {
  'POST /api/admin/getProvince': getProvince,
  'POST /api/admin/exception': (req, res) => {
    const { url, query, body } = req;
    const { code = 200 } = body;
    res.status(code).send({ url, query, body });
  },
};
