export class Popup {
  constructor(popupSelector, formSubmitHandler) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButtonElement = this._popup.querySelector('.popup__close-button');
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputs = this._formElement.querySelectorAll('.popup__form-input')
    this._formSubmitHandler = formSubmitHandler;
  }

  setSubmitHandler(newSubmitHandler) {
    this._formSubmitHandler = newSubmitHandler;
  }

  open() {
    this._popup.style.visibility = 'visible';
    this._popup.style.opacity = '1'
    this._formElement.reset();
  }

  close() {
    this._popup.style.visibility = 'hidden';
    this._popup.style.opacity = '0'
  }

  setEventListeners() {
    this._popupCloseButtonElement.addEventListener('click', () => {
      this.close();
    })

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputsData());
    })
  }

  _getInputsData() {
    this._inputsData = {};
    this._inputs.forEach(input => {
      this._inputsData[input.name] = input.value.toUpperCase();
    })
    return this._inputsData;
  }
}