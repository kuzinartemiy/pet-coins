import { Api } from '../scripts/components/Api.js';
import { Coin } from '../scripts/components/Coin.js';
import { Popup } from '../scripts/components/Popup.js';
import { FormValidator } from '../scripts/components/FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  templateClass: '.place__template'
}

const coinsListElement = document.querySelector('.coins__list');
const addCoinButtonElement = document.querySelector('.coins__add-coin-button');
const coinsLoaderElement = document.querySelector('.coins__loader');

const api = new Api();
const coins = [
  {token: 'BTC', currency: "USDT"},
  {token: 'ETH', currency: "USDT"},
  {token: 'XRP', currency: "USDT"},
  {token: 'SHIB', currency: "USDT"},
  {token: 'DOGE', currency: "USDT"}
]

const renderLoading = (isLoading) => {
  if(isLoading) {
    coinsLoaderElement.style.display = 'block';
  } else {
    coinsLoaderElement.style.display = 'none';
  }
}

const addCoinPopup = new Popup('#add-coin-popup', addCoinHandler);
addCoinPopup.setEventListeners();

addCoinButtonElement.addEventListener('click', () => {
  addCoinPopup.open();
  addCoinValidator.disableButton();
})

const deletePopup = new Popup('#delete-coin-popup', emptyHandler);
deletePopup.setEventListeners();

function emptyHandler() {}

function deleteCoinHandler(coin) {
  deletePopup.open();
  deletePopup.setSubmitHandler(() => {
    coin.deleteCoin();
    deletePopup.close();
  })
}

async function asyncRenderer(coins, container) {
  renderLoading(true);
  const coinsData = {};
  for (const coin of coins) {
    const responce = await api.getCoinData(coin.token, coin.currency);
    const coinData = new Coin(responce, coin, '.coin__template', updatePriceHandler, deleteCoinHandler);
    coinsData[coin.token + coin.currency] = coinData.generateCoin();
  }
  renderLoading(false);
  for (const coin of coins) {
    container.append(coinsData[coin.token + coin.currency]);
  }
}

const updatePriceHandler = (token, currency, coin) => {
  api.getCoinData(token, currency)
  .then(responce => {
    coin.updatePrice(responce.price);
  })
  .catch(error => {
    console.log('TOKEN DATA: ' + error);
  })
}

const addCoinValidator = new FormValidator(config, '#add-coin-form');
addCoinValidator.enableValidation();

function addCoinHandler(coin) {
  api.getCoinData(coin.token, coin.currency)
    .then(responce => {
      const coinData = new Coin(responce, coin, '.coin__template', updatePriceHandler, deleteCoinHandler);
      coinsListElement.append(coinData.generateCoin());
      addCoinPopup.close();
    })
    .catch(error => {
      сonsole.log('NO TOKEN TO ADD: ' + error);
    })
}

asyncRenderer(coins, coinsListElement);