import axios from 'axios';

// Параметри запиту
const requestParameters = {
  key: '33868787-6baf6a5b231479a4e20e31aff',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
};

axios.defaults.baseURL = 'https://pixabay.com/api/'; // Адреса api сервера

/**
 * Виконує запит на сервер
 * @param {string} requestText яке зображення шукає (інформація про запит)
 * @param {Number} page яка частина інформації
 * @param {Number} perPage обсяг інформації (кількість зображень на одне завантаження)
 * @returns {object} об'єкт з даними про зображення
 */
export async function fetchImages(requestText, page, perPage) {
  requestParameters.q = requestText;
  requestParameters.page = page;
  requestParameters.per_page = perPage;

  const parameters = new URLSearchParams(requestParameters); // Отримує частину url з параметрами

  const response = await axios.get(`?${parameters}`);

  return response;
}
