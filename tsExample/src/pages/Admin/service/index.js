import request from '@/utils/request';

export async function fetchInfo(type = 'default') {
  return request('/api/admin/getProvince', {
    method: 'POST',
    data: {
      type,
    },
  });
}

// 异常状态
export async function fetcException(data = {}) {
  return request('/api/admin/exception', {
    method: 'POST',
    data,
  });
}
