import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
//  vus: 10,
//  duration: '10s',
thresholds: {
    // 90% of requests must finish within 400ms.
    http_req_duration: ['p(95) < 400'],
  },
};

export default function () {
  const res =http.get('URL');
  check(res, { 'status is 404': (r) => r.status == 404,});
  check(res, { 'status is 200': (r) => r.status == 200,});
  sleep(1);
}
