
import ws from 'k6/ws';
import { check } from 'k6';
import { randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
let sessionDuration = randomIntBetween(5 * 60 * 1000, 10 * 60 * 1000); // user session between 10s and 1m
// export let options = {
//     stages: [
//       { duration: '60s', target:  200 }, // below normal load
//     //   { duration: '1m', target: 10 },
//     //   { duration: '10s', target: 50 }, // spike to 50 users
//     //   { duration: '3m', target: 50 },   // stay at 50 users for 3 mins
//     //   { duration: '10s', target: 10 }, // scale down. Recovery stage.
    
//     ],
//   };
export let options = {
  vus: 500,
  iterations: 500, 
};
export default function () {
  const url = 'wss://feeds.xcp.dev.maqehq.com/marketdepth';
  const params = { "symbol" : "BTCTHB" } ;
  

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function () {
      console.log(`VU ${__VU} connected`);
      socket.send(JSON.stringify({symbol : "BTCTHB" }));  
    });
    socket.on('message', function (message){
        let msg = JSON.parse(message);
        if (msg.event == 'trade'){
          let data = JSON.stringify(msg.data)
          console.log(data)
        }       
      });
      socket.setTimeout(function () {
        console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
        socket.close();
      }, sessionDuration+3000);
    });
//     socket.setTimeout(function () {
//     console.log('5 sec passed, closing the socket');
//     socket.close();
//     } ,5000);
// });

check(res, { 'status is 101': (r) => r && r.status === 101 });

}
