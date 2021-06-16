import request from '@/utils/request';

export async function fetchInfo(params = {}) {
  return request('/api/global/activities', {
    params,
  });
}
