import request from '@/utils/request';

export async function fetchInfo(type = 'default') {
  return request('/api/profile/info', {
    method: 'POST',
    data: {
      type,
    },
  });
}
