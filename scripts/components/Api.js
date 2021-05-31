export class Api {
    constructor() {

    }

    _getResponceData(responce){
      if(!responce.ok) {
        return Promise.reject(`Ошибка: ${responce.status}`);
      }
      return responce.json();
    }

    async getCoinData(coin) {
      return fetch (`https://www.binance.com/api/v3/ticker/price?symbol=${coin}`, {
        method: 'GET',
      })
      .then(this._getResponceData);
    }
}