export class FormValidator {
  constructor(config, formSelector) {
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(config.submitButtonSelector);
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
      })
    })
  }

  _toggleButtonState() {
    this._hasNotValidInput = this._inputList.some(this._findNotValid);
    if(this._hasNotValidInput) {
      this.disableButton();
    } else {
      this._submitButtonElement.removeAttribute('disabled', true);
    }
  }

  _findNotValid(inputElement) {
    return !inputElement.validity.valid;
  }

  disableButton() {
    this._submitButtonElement.setAttribute('disabled', true);
  }

  enableValidation() {
    this._setEventListeners();
  }

}