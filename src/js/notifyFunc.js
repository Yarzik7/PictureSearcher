import { Notify } from 'notiflix/build/notiflix-notify-aio';
export { notifyFailure, notifySuccsess, notifyInfo };

const notifyFailure = (timeout = 3000) =>
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    { timeout: timeout }
  );

const notifySuccsess = (totalHits, timeout = 3000) =>
  Notify.success(`Hooray! We found ${totalHits} images.`, { timeout: timeout });

const notifyInfo = (timeout = 3000) =>
  Notify.info('Were sorry, but youve reached the end of search results.', {
    timeout: timeout,
  });
