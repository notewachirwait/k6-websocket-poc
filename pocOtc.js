import { Trend } from 'k6/metrics';
import { sleep, group } from "k6";
import { check } from 'k6';
import {createTransac,depositBalance} from '../k6-websocket-poc/payload.js'
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';
  
let sessionConfig = JSON.parse(open('../k6-websocket-poc/config.json'));
export let options = {
  vus: 2,
  iterations: 2, 
};
function topUpbalance (){
  let session = new Httpx({baseURL: sessionConfig.api.urlAssetManager});
  session.addHeaders({
    "Content-Type": "application/json"
  });
  let res = [];
  res.push(session.post(`/api/deposit`, JSON.stringify(depositBalance)));
  res.forEach((response) => {
    let body = JSON.parse(response.body);
    console.log("Response: "+ body.data)
  });


  const status = res.pop();
  check(status, { 'status was 200': r => r.status == 200});
  sleep(1);
}
export default function createTransaction () {
  topUpbalance()
  group("createTransaction", function () {
  let session = new Httpx({baseURL: sessionConfig.api.urlOtc});
  session.addHeaders({
    "Content-Type": "application/json"
  });
  let res = [];
  res.push(session.post(`/api/transact`, JSON.stringify(createTransac)));
  res.forEach((response) => {
    let body = JSON.parse(response.body);
    console.log("Response: "+ body.data.quote_id)
  });
  const status = res.pop();
  check(status, { 'status was 200': r => r.status == 200});
  sleep(1);
}
  )}
