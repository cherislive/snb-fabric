import request from '@/utils/request';

export async function fetchInfo(type = 'default') {
  return request('/api/global/forms', {
    method: 'POST',
    data: {
      type,
    },
  });
}
