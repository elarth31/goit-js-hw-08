import images from './gallery-images.js';

const photoGrid = document.querySelector('.gallery');

const galleryHTML = images.map(({ preview, original, description }) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
});


photoGrid.insertAdjacentHTML('beforeend', galleryHTML.join(''));


photoGrid.addEventListener('click', event => {
  event.preventDefault();

  const isImageEl = event.target.classList.contains('gallery-image');
  if (!isImageEl) {
    return;
  }

  const largeImageURL = event.target.dataset.source;
  openImageInModal(largeImageURL);
});


function openImageInModal(imageSource) {
  const modalInstance = basicLightbox.create(`
    <img src="${imageSource}" width="1112" height="640">
  `, {
    onShow: (modalInstance) => {
   
      window.addEventListener('keydown', handleEscapeKey);
    },
    onClose: (modalInstance) => {

      window.removeEventListener('keydown', handleEscapeKey);
    }
  });

  modalInstance.show();

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      modalInstance.close();
    }
  }
}
