import {
	randomGuid,
} from '.././k6-websocket-poc/randomGuid.js';

export const createTransac = {
	"quote_id": randomGuid(),
    "instrument_id": "zipcard.ETH.SGD",
    "side": "sell",
    "amount":0.05,
    "value": null,
    "from_service_id": "main_wallet",
    "from_account_id": "01FMHARWKWXHVH1TWXWYNP2MF6",
    "to_service_id": "card_service",
    "to_account_id": "system",
    "metadata": "{\"reference\": \"ref_001\"}"
}

export const depositBalance = {
    "service_id": "main_wallet",
    "account_id": "01FMHARWKWXHVH1TWXWYNP2MF6",
    "product_id": "eth.global",
    "amount": "1",
    "source": "test",
    "source_ref": "test",
    "ref_caller": "test",
    "ref_action": "deposit",
    "ref_id": randomGuid(),
    "idempotent_key": randomGuid()
}