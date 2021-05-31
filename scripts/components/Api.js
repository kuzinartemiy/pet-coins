export class Api {
    constructor() {

    }

    async getCoinData(coin) {
      return fetch (`https://www.binance.com/api/v3/ticker/price?symbol=${coin}`, {
        method: 'GET',
      })
      .then(resolve => {
        return resolve.json();
      })
    }
}