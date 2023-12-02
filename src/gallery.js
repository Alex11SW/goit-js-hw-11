import SimpleLightbox from 'simplelightbox';
//  import 'simplelightbox/dist/simple-lightbox.min.css';


function renderImages(images, gallery) {
    const cardsMarkup = images.map(createImageCard).join('');
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', cardsMarkup);
    
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }
  
  function createImageCard(image) {
    return `
      <div class="photo-card">
        <a href="${image.webformatURL}" data-lightbox="gallery">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        </a>
        <div class="info">
          ${createInfoItem("Likes", image.likes)}
          ${createInfoItem("Views", image.views)}
          ${createInfoItem("Comments", image.comments)}
          ${createInfoItem("Downloads", image.downloads)}
        </div>
      </div>
    `;
  }
  
  function createInfoItem(label, value) {
    return `<p class="info-item"><b>${label}:</b> ${value}</p>`;
  }
  



 export { renderImages };