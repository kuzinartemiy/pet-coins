export class Coin {
  constructor(coinData, coinLocalData, placeTemplate, updatePriceHandler, deleteCoinHandler) {
    this._updateInterval = 2000;
    this._coinDataToken = coinData.symbol;
    this._price = coinData.price;
    this._token = coinLocalData.token;
    this._coinCurrency = coinLocalData.currency;
    this._updatePriceHandler = updatePriceHandler;
    this._deleteCoinHandler = deleteCoinHandler;
    this._templateSelector = placeTemplate;
    this._coinElement = this._getTemplate();
    this._coinTitleElement = this._coinElement.querySelector('.coin__title');
    this._coinPriceElement = this._coinElement.querySelector('.coin__price');
    this._deleteButtonElement = this._coinElement.querySelector('.coin__delete-button');
  }

  _getTemplate() {
    const coinElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.coin')
      .cloneNode(true);
    return coinElement;
  }

  generateCoin() {
    this._setEventListeners();
    this._coinIconUrl = `https://cryptoicons.org/api/icon/${this._token.toLowerCase()}/200`
    this._coinElement.querySelector('.coin__title').textContent = this._coinDataToken;
    this._coinElement.querySelector('.coin__price').textContent = this._price;
    this._coinElement.querySelector('.coin__icon').style.backgroundImage = `url(${this._coinIconUrl})`;
    this._coinElement.querySelector('.coin__currency-icon').style.backgroundImage = `url(../../../images/${this._coinCurrency.toLowerCase()}.svg)`;
    this._setUpdateInterval();
    return this._coinElement;
  }

  deleteCoin() {
    this._coinElement.remove();
    clearInterval(this._intervalID);
  }

  _setEventListeners() {
    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteCoinHandler(this);
    })
  }

  updatePrice(newPrice) {
    if(this._coinPriceElement.textContent < newPrice) {
      this._coinPriceElement.style.color = 'rgb(5, 177, 105)';
    } else if (this._coinPriceElement.textContent > newPrice) {
      this._coinPriceElement.style.color = 'rgb(223, 95, 103)';
    }
    this._coinPriceElement.textContent = newPrice;
  }

  _setUpdateInterval() {
    this._intervalID = setInterval(() => {
      this._updatePriceHandler(this._token,this._coinCurrency, this);
    }, this._updateInterval);
  }
}