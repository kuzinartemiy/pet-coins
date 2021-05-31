import { Api } from '../scripts/components/Api.js';
import { Coin } from '../scripts/components/Coin.js';

const coinsListElement = document.querySelector('.coins');
const api = new Api();
const coins = [
  {token: 'BTCUSDT'},
  {token: 'XRPUSDT'},
  {token: 'SHIBUSDT'},
  {token: 'DOGEUSDT'}
]

async function asyncRenderer(coins, container) {
  const coinsData = {};
  for (const coin of coins) {
    const responce = await api.getCoinData(coin.token);
    const coinData = new Coin(responce, '.coin__template', updatePriceHandler);
    coinsData[coin.token] = coinData.generateCoin();
  }

  for (const coin of coins) {
    container.append(coinsData[coin.token]);
  }
}

asyncRenderer(coins, coinsListElement);

function updatePriceHandler(token, coin) {
  setInterval(() => {
    api.getCoinData(token)
    .then(res => {
      coin.updatePrice(res.price);
    })
  }, 2000)
}

// const interval = setInterval(() => console.log('tick'), 2000);