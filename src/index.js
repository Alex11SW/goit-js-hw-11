  import Notiflix from 'notiflix'; 
  import axios from 'axios';
  import SimpleLightbox from 'simplelightbox';
  import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const gallery = document.querySelector(".gallery");
  const loadMoreBtn = document.querySelector(".load-more");
  let currentPage = 1;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchQuery = event.target.searchQuery.value;
    if (!searchQuery) {
      return;
    }
    gallery.innerHTML = '';
  
    try {
    
      const imageData = await fetchImages(searchQuery, currentPage);
      renderImages(imageData);
      const totalHits = imageData.length > 0 ? imageData[0].totalHits : 0;
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  
      if (imageData.length === 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
      } else {
        loadMoreBtn.style.display = "block";
      }
    } catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again later.");
      console.error("Error fetching images:", error);
    }
  });

  loadMoreBtn.addEventListener("click", async () => {
    currentPage++;
    try {
      const imageData = await fetchImages(form.searchQuery.value, currentPage);
      renderImages(imageData);
      if (imageData.length === 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.style.display = "none";
      }
    } catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again later.");
      console.error("Error fetching images:", error);
    }
  });
  async function fetchImages(query, page) {
    const apiKey = "40978531-d49fca5d0ddc7815b1fb6eda5";
    const perPage = 40;

    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    const response = await axios.get(apiUrl);
    return response.data.hits;
 }
  function renderImages(images) {
    images.forEach((image) => {
      const card = createImageCard(image);
      gallery.appendChild(card);
    });
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }

  function createImageCard(image) {
    const card = document.createElement("div");
    card.classList.add("photo-card");

    const a = document.createElement("a");
    a.href = image.webformatURL;
   a.setAttribute("data-lightbox", "gallery");

    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";

    a.addEventListener("click", (event) => {
      event.preventDefault();
      const lightbox = new SimpleLightbox(image.webformatURL);
      lightbox.start();
    });

    const info = document.createElement("div");
    info.classList.add("info");

    const likes = createInfoItem("Likes", image.likes);
    const views = createInfoItem("Views", image.views);
    const comments = createInfoItem("Comments", image.comments);
    const downloads = createInfoItem("Downloads", image.downloads);

    info.append(likes, views, comments, downloads);
    a.appendChild(img);

    card.append(a, info);
     return card;
  }

  function createInfoItem(label, value) {
    const item = document.createElement("p");
    item.classList.add("info-item");
    item.innerHTML = `<b>${label}:</b> ${value}`;
    return item;
  }
});
