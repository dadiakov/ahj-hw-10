/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

export default class Message {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.input = this.element.querySelector('.input-text');
    this.messageContainer = this.element.querySelector('.message-container');
    this.element.querySelector('.input-form').addEventListener('submit', this.addMessage.bind(this));
    this.successHandler = this.successHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.coordsModal = this.element.querySelector('.coords-modal');
    this.coordsModal.addEventListener('submit', this.checkModal.bind(this));
    this.modalInput = this.element.querySelector('.modal-input');
    this.checkCoordsMessage = this.element.querySelector('.check-coords-input');
    this.loadData();
  }

  addMessage(e) {
    e.preventDefault();

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successHandler, this.errorHandler, geoOptions);
    }
  }

  successHandler(position) {
    const { latitude, longitude } = position.coords;
    this.coords = `[${latitude.toFixed(5)}, ${longitude.toFixed(5)}]`;
    this.drawMessage();
  }

  errorHandler(e) {
    if (e.code === 1) {
      console.log('Не удалось получить информацию о геолокации, поскольку у страницы не было разрешения на это.');
    } else if (e.code === 2) {
      console.log('Не удалось получить геолокацию, поскольку по крайней мере один внутренний источник позиции вернул внутреннюю ошибку.');
    } else if (e.code === 3) {
      console.log('Слижком долго получаем информацию...');
    }
    this.coordsModal.classList.remove('hide');
  }

  drawMessage() {
    const messageDiv = `
    <div class='message-item'>
    <div class='message-content'>${this.input.value}</div>
    <div class='message-coords'>${this.coords}</div>
    <div class='message-time'>${getCurrentTime()}</div>
    </div>`;
    this.input.value = '';

    this.messageContainer.insertAdjacentHTML('beforeend', messageDiv);
    this.saveData();
  }

  checkModal(e) {
    e.preventDefault();
    if (e.target.classList.contains('modal-cancel')) {
      this.modalInput.value = '';
      this.coordsModal.classList.add('hide');
      return;
    }
    if (!this.checkCoordsInput(this.modalInput.value)) {
      this.checkCoordsMessage.classList.remove('hide');
      return;
    }
    this.checkCoordsMessage.classList.add('hide');
    this.coords = this.modalInput.value;
    this.drawMessage();
    this.coordsModal.classList.add('hide');
  }

  static checkCoordsInput(coords) {
    return /^\[?\d{1,2}\.\d{1,5}\,\s?\-?\d{1,2}\.\d{1,5}\]?/.test(coords);
  }

  saveData() {
    localStorage.setItem('message-data', JSON.stringify(this.element.querySelector('.message-container').innerHTML));
  }

  loadData() {
    try {
      this.element.querySelector('.message-container').innerHTML = JSON.parse(localStorage.getItem('message-data'));
    } catch (error) {
      console.log('Не удалось загрузить данные');
    }
  }
}

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) month = `${0}${month}`;
  const day = now.getDate();
  let hour = now.getHours();
  if (hour < 10) hour = `${0}${hour}`;
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = `${0}${minutes}`;
  return `${day}.${month}.${year} ${hour}:${minutes}`;
}
