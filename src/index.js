import { fetchImages } from './js/fetchImages';
import { notifyFailure, notifySuccsess, notifyInfo } from './js/notifyFunc';
import { createImageNode } from './js/createImageNode';
import SimpleLightbox from 'simplelightbox';
import { infiniteScroll } from './js/infiniteScroll';

import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const searchBtnEl = document.querySelector('.header__button-search');
const loadMoreEl = document.querySelector('.button-load-more');
const galleryEl = document.querySelector('.gallery');

let simpleLB = new SimpleLightbox('.gallery a'); // Ініціалізація SimpleLightbox
let page = 1; // Представляє номер сторінки для завантаження
let isLoading = false; // Стан завантаження даних
let inputText = ''; // Зображення чого потрібно знайти
let perPage = 40; // Кількість зображень на одну сторінку

/**
 * Скролить сторінку вниз на 2 висоти елемента галереї
 */
const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
//

/**
 * Рендерить нові зображення якщо проміс успішний
 * @param {object} imagesSet Об'єкт з інформацією про знайдені зображення
 * @returns {undefined || void}
 */
const promiseProcessing = imagesSet => {
  const { totalHits, hits } = imagesSet; // Деструктуризація кількості доступних зображень і масиву з інформацією про зображення

  // Якщо не знайдено жодного зображення за запитом
  if (!totalHits) {
    notifyFailure(5000);
    isLoading = false;
    window.removeEventListener('scroll', infiniteScroll);
    return;
  } else if (hits.length < perPage || totalHits / perPage === page) {
    // Якщо завантажені всі знайдені зображення
    notifyInfo(5000);
    loadMoreEl.style.display = 'none';
    window.removeEventListener('scroll', infiniteScroll);
  } else {
    // Якщо завантажений черговий набір інформації про зображення
    loadMoreEl.style.display = 'inline-block';
    page++;
  }

  notifySuccsess(totalHits, 5000);
  const galleryNodes = hits.map(imageInfo => createImageNode(imageInfo)); // Створення розмітки для одного зображення
  galleryEl.insertAdjacentHTML('beforeend', galleryNodes.join('')); // Рендер розмітки з зображеннями
  simpleLB.refresh(); // Повторна ініціалізація SimpleLightbox
  isLoading = false;
  if (page > 2) smoothScroll(); // Плавний скрол вниз на 2 висоти елемента галереї
};

/**
 * Викликає функцію для виконання запиту на сервер
 * @param {string} request
 */
const callFetch = request => {
  isLoading = true;
  fetchImages(request, page, perPage)
    .then(imagesSet => promiseProcessing(imagesSet.data))
    .catch(error => {
      console.log(error);
      isLoading = false;
    });
};

/**
 * Формує нову інформацію для запиту
 * @param {object} event 'submit'
 * @returns {undefined || void}
 */
const onSubmit = event => {
  event.preventDefault();

  searchBtnEl.blur(); // Знімає ефект фокусу кнопки після кліку

  // Очищення розмітки перед новим запитом
  galleryEl.innerHTML = '';
  loadMoreEl.style.display = 'none';
  page = 1;
  inputText = '';

  inputText = event.currentTarget.elements.searchQuery.value;

  // Якщо інформація для запиту не була введена (пусте поле)
  if (!inputText) {
    notifyFailure();
    return;
  }

  window.addEventListener('scroll', infiniteScroll);
  callFetch(inputText); // Передача нової інформації для запиту
  form.reset();
};

/**
 * Завантажує ще зображення за попереднім запитом
 */
const onClick = () => {
  loadMoreEl.style.display = 'none';
  callFetch(inputText); // Передача попередньої інформації для запиту
};

/**
 * Завантажує зображення при скролі
 */
const infiniteScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 500 && !isLoading) {
    onClick();
  }
};

form.addEventListener('submit', onSubmit);
loadMoreEl.addEventListener('click', onClick);
