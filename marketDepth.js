
import ws from 'k6/ws';
import { check } from 'k6';
import { randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

let minimumDuration = 300000 // millisecond -> 5 minutes
let maximumDuration = 600000 // millisecond -> 10 minutes
let sessionDuration = randomIntBetween(minimumDuration, maximumDuration); 

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

check(res, { 'status is 101': (r) => r && r.status === 101 });

}
