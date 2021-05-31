export class Coin {
  constructor(coinData, placeTemplate, updatePriceHandler, deleteCoinHandler) {
    
    this._price = coinData.price;
    this._token = coinData.symbol;

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

    this._coinElement.querySelector('.coin__title').textContent = this._token;
    this._coinElement.querySelector('.coin__price').textContent = this._price;
    this._updatePriceHandler(this._token, this);
    return this._coinElement;
  }

  _setEventListeners() {
    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteCoin();
    })
  }

  updatePrice(newPrice) {
    if(this._coinPriceElement.textContent < newPrice) {
      this._coinPriceElement.style.backgroundColor = '#1D9B53';
    } else if (this._coinPriceElement.textContent > newPrice) {
      this._coinPriceElement.style.backgroundColor = '#B9473F';
    }
    this._coinPriceElement.textContent = newPrice;
  }

  _deleteCoin() {
    this._coinElement.remove();
  }
}