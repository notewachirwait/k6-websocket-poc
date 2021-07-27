import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'wss://feeds.xcp.dev.maqehq.com/market';
  const params = { tags: { my_tag: 'hello' } };
 
  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => console.log('connected'));
    socket.on('close', () => console.log('disconnected'));
   
    socket.setTimeout(function () {
      console.log('5 seconds passed, closing the socket');
      socket.close();
    }, 5000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });

}
