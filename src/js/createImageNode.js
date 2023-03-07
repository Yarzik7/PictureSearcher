/**
 * Створює розмітку для одного зображення
 * @param {object} imageInfo Дані про зображення
 * @returns {string} Розмітка елемента
 */
export const createImageNode = imageInfo => {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = imageInfo;

  const node = `
      <div class="photo-card">
      <a href="${largeImageURL}" class="gallery__link link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"/>
        <div class="info">
          <p class="info__item">
            <b class="info__caption">Likes</b>
            <span class="info__count">${likes}</span>
          </p>
          <p class="info__item">
            <b class="info__caption">Views</b>
            <span class="info__count">${views}</span>
          </p>
          <p class="info__item">
            <b class="info__caption">Comments</b>
            <span class="info__count">${comments}</span>
          </p>
          <p class="info__item">
            <b class="info__caption">Downloads</b>
            <span class="info__count">${downloads}</span>
          </p>
        </div>
        </a>
       </div>`;

  return node;
};
