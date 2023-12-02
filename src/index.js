  import Notiflix from 'notiflix'; 
  import fetchImages from './api';
  import { renderImages } from './gallery';
  // import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const gallery = document.querySelector(".gallery");
  const loadMoreBtn = document.querySelector(".load-more");
  let currentPage = 1;
  let totalHits = 0;

  loadMoreBtn.style.display = "none";

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchQuery = event.target.searchQuery.value.trim();
    if (!searchQuery) {
      return;
    }
    gallery.innerHTML = '';
    currentPage = 1;

    try {
    
      const { hits, total } = await fetchImages(searchQuery, currentPage);
      renderImages(hits, gallery);
      totalHits = total;
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  
      if (hits.length === 0) {
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
      const { hits } = await fetchImages(form.searchQuery.value, currentPage);
      renderImages(hits, gallery);
      if (hits.length === 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.style.display = "none";
      }
    } catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again later.");
      console.error("Error fetching images:", error);
    }
  });
});
