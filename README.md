# k6-test-performance

## How to run

1. Install all dependencies

```
brew install k6
brew install influxdb@1
brew install grafana
```

2. cd otc

```
# run k6 load test
brew services start influxdb@1
brew services start grafana
k6 run --out influxdb=http://localhost:8086/mydb createTransaction.js
k6 run --out influxdb=http://localhost:8086/mydb getListBalance.js

```
### Create your first database

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE DATABASE mydb"
```
Set up grafana dashboard
![image](https://user-images.githubusercontent.com/86100663/143769967-47d84688-db1f-4a6f-a1c5-dd8312fb3103.png)
![image](https://user-images.githubusercontent.com/86100663/143770023-c3090d98-f5f6-454a-a0c5-8f58a625dd13.png)
