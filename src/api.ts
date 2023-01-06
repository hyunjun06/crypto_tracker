const BASE_URL = "https://api.coinpaprika.com/";

export const fetchCoins = () => (
    fetch(`${BASE_URL}v1/coins`).then(res => res.json())
);

export const fetchCoin = (id: string) => (
    fetch(`${BASE_URL}v1/coins/${id}`).then(res => res.json())
);

export const fetchPrice = (id: string) => (
    fetch(`${BASE_URL}v1/tickers/${id}`).then(res => res.json())
);

export const fetchCoinHistory = (id: string) => (
    fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${id}`).then(res => res.json())
);