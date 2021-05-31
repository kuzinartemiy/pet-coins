export class Coin {
  constructor(coinData, placeTemplate, updatePriceHandler) {
    
    this._price = coinData.price;
    this._token = coinData.symbol;
    this._updatePriceHandler = updatePriceHandler;
    this._templateSelector = placeTemplate;
    this._coinElement = this._getTemplate();
    this._coinTitleElement = this._coinElement.querySelector('.coin__title');
    this._coinPriceElement = this._coinElement.querySelector('.coin__price');
    this._updateButtonElement = this._coinElement.querySelector('.coin__update-button');
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

    //this._setEventListeners();
    this._coinElement.querySelector('.coin__title').textContent = this._token;
    this._coinElement.querySelector('.coin__price').textContent = this._price;
    this._updatePriceHandler(this._token, this);
    return this._coinElement;
  }

  // _setEventListeners() {
  //   this._updateButtonElement.addEventListener('click', () => {
  //     this._updatePriceHandler(this._token, this);
  //   })
  // }

  updatePrice(newPrice) {
    if(this._coinPriceElement.textContent < newPrice) {
      this._coinPriceElement.style.backgroundColor = '#1D9B53';
    } else if (this._coinPriceElement.textContent > newPrice) {
      this._coinPriceElement.style.backgroundColor = '#B9473F';
    }
    this._coinPriceElement.textContent = newPrice;
  }
}