
import ws from 'k6/ws';
import { check } from 'k6';

export let options = {
    stages: [
      { duration: '20s', target: 10 }, // below normal load
    //   { duration: '1m', target: 10 },
    //   { duration: '10s', target: 50 }, // spike to 50 users
    //   { duration: '3m', target: 50 },   // stay at 50 users for 3 mins
    //   { duration: '10s', target: 10 }, // scale down. Recovery stage.
    
    ],
  };
export default function () {
  const url = 'wss://feeds.xcp.dev.maqehq.com/marketdepth';
  const params = { "symbol" : "BTCTHB" } ;
  

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function () {
      console.log(`VU ${__VU} connected`);
      socket.send(JSON.stringify({symbol : "BTCTHB" }));
      
    });
    socket.on('close', () => console.log(`VU ${__VU} disconnected`));
    socket.on('message', function (message){
        let msg = JSON.parse(message);
          console.log(`VU ${__VU} sym: ${msg.data.sym} c: ${msg.data.c}`)
      });
    socket.on('event', (data) => console.log('Message received: ', data));
    socket.setTimeout(function () {
      console.log('5 sec passed, closing the socket');
    socket.close();
    } ,5000);
});

check(res, { 'status is 101': (r) => r && r.status === 101 });

}
