export class Form {
  constructor(formSelector, formSubmitHandler) {
    this._formElement = document.querySelector(formSelector);
    this._inputs = this._formElement.querySelectorAll('.form__input')
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputsData() {
    this._inputsData = {};
    this._inputs.forEach(input => {
      this._inputsData[input.name] = input.value;
    })
    return this._inputsData;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputsData());
      this._formElement.reset();
    })
  }
}