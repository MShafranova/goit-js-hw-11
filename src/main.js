import { fetchImages } from './js/pixabay-api.js';
import {
  showErrorToast,
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery
} from './js/render-function.js';

const form = document.querySelector('#form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 300,
  widthRatio: 0.9,
  scaleImageToRatio: true,
};

loader.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const userInput = document.getElementById('search').value.trim();

    if (!userInput) {
      return;
    }

    showLoader(loader);
    clearGallery(gallery);

    try {
      const data = await fetchImages(userInput);
      handleResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      showErrorToast('An error occurred while fetching data. Please try again.');
    } finally {
      hideLoader(loader);
    }
  });

  function handleResponse(data) {
    if (data.hits.length === 0) {
      showErrorToast('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderGallery(data.hits, gallery, options);
      form.reset();
    }
  }
});
