import request from '@/utils/request';

export async function fetchInfo(type = 'default') {
  return request('/api/global/activities');
}

export async function fetchUserInfo(data = {}) {
  return request('/api/user/account', {
    method: 'POST',
    data,
  });
}
