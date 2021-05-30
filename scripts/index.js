import { Api } from './components/Api.js';
import { Coin } from './components/Coin.js';

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
    const responce = await fetch(`https://www.binance.com/api/v3/ticker/price?symbol=${coin.token}`);
    const jsonData = await responce.json();
    const coinData = new Coin(jsonData, '.coin__template');
    coinsData[coin.token] = coinData.generateCoin();
  }

  for (const coin of coins) {
    container.append(coinsData[coin.token]);
  }
}

asyncRenderer(coins, coinsListElement);