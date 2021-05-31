export class Api {
    constructor() {

    }

    _getResponceData(resesponce){
      if(!resesponce.ok) {
        return Promise.reject(`Ошибка: ${resesponce.status}`);
      }
      return resesponce.json();
    }

    async getCoinData(coin) {
      return fetch (`https://www.binance.com/api/v3/ticker/price?symbol=${coin}`, {
        method: 'GET',
      })
      .then(this._getResponceData);
      // .then(resolve => {
      //   return resolve.json();
      // })
    }
}