import { randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import ws from 'k6/ws';
import { check, sleep } from 'k6';

let minimumDuration = 300000 // millisecond -> 5 minutes
let maximumDuration = 600000 // millisecond -> 10 minutes
let sessionDuration = randomIntBetween(minimumDuration, maximumDuration); 

export let options = {
  vus: 10,
  iterations: 10, 
};

export default function () {
  let url = 'wss://feeds.xcp.dev.maqehq.com/market';
  let params = { tags: { my_tag: 'my ws session' } };

  let res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log(`VU ${__VU}: connected`);    
    });
    socket.on('close', function () {
      console.log(`VU ${__VU}: disconnected`);
    });
    socket.on('error', function (e) {
        if (e.error() != 'websocket: close sent') {
            console.error('An unexpected error occured: ', e.error());
        }
    });
    socket.on('message', function (message){
      let msg = JSON.parse(message);
     
        // console.log(`VU ${__VU} symbol: ${msg.symbol} price: ${msg.price}`)
    });



    socket.setTimeout(function () {
      console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
      socket.close();
    }, sessionDuration+3000);
  });

  check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}
