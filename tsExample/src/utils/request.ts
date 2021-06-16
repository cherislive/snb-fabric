/**
 * Request
 * Github: https://github.com/umijs/umi-request
 */
// import axios from 'axios';
import { extend } from 'umi-request';
import { MessageBox, Message } from 'element-ui';
import _ from 'lodash';
import router from '@/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 节流 Tips
 * @param msg 提示信息
 * @param type 提示类型
 */
const errorTips = _.throttle((msg: string, type: string | number, status?: number) => {
  if (type === 'confirm') {
    MessageBox.alert(msg, '提示', {
      type: 'warning',
      showClose: false,
    }).then(() => {
      status
        && router.push({
          path: `/exception/${status}`,
        });
    });
  } else {
    Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000,
    });
  }
}, 1000);

/** 异常处理程序 */
const errorHandler = (error: Record<string, any>) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 401) {
      errorTips(errorText, 'confirm', status);
      return response;
    }
    errorTips(errorText, 'tips');
    /* eslint-disable no-console */
    console.log(`请求错误 ${status}: ${errorText}: ${url}`);
    router.push({
      path: `/exception/${status}`,
    });
  }
  if (!response) {
    errorTips('您的网络发生异常，无法连接服务器', 'tips');
  }
  // throw error;
  return response;
};

const service = extend({
  prefix: '', // baseURL '/api'
  errorHandler,
  timeout: 3000,
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

service.interceptors.request.use((_: any, options: Record<string, any>) => {
  const nextOptions = { ...options };
  if (nextOptions.requestType === 'form' || Array.isArray(nextOptions.data)) {
    return { options };
  }
  /* eslint-disable no-underscore-dangle */
  const accessToken = window.__ACCESS_TOKEN || localStorage.getItem('tracert-token');
  if (accessToken) {
    nextOptions.headers.Authorization = accessToken;
  }
  return {
    options: nextOptions,
  };
});

service.interceptors.response.use(async (response: any, options: Record<string, any>) => {
  const data = (await response.clone().json()) || {};
  const { code, message, msg } = data;
  const errMsg = message || msg || 'Error';
  if (code && code !== 200) {
    if (code === 401) {
      errorTips(errMsg, 'confirm');
      return;
    }
    errorTips(errMsg, 'tips');
  }
  return response;
});

export function formatStatus(status: number | string) {
  return codeMessage[status] || `抱歉，访问失败请稍后重试[${status}]。`;
}

export default async (api: Record<string, any> | string, options?: Record<string, any>) => {
  if (typeof api !== 'string' && api.url) {
    const nextOptions = { ...api };
    delete nextOptions.url;
    return await service(api.url, nextOptions);
  }
  return await service(api as string, options);
};
