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
