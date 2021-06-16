import request from '@/utils/request';

export async function fetchA(data = {}) {
  return request('/api/example/a', {
    method: 'POST',
    data,
  });
}
export async function fetchB(data = {}) {
  return request('/api/example/b', {
    method: 'POST',
    data,
  });
}
export async function fetchC(data = {}) {
  return request('/api/example/c', {
    method: 'POST',
    data,
  });
}
export async function fetchD(data = {}) {
  return request('/api/example/d', {
    method: 'POST',
    data,
  });
}
