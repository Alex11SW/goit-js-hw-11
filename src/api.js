import axios from 'axios';

 async function fetchImages(query, page) {
  const apiKey = "40978531-d49fca5d0ddc7815b1fb6eda5";
  const perPage = 40;

  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(apiUrl);
  return { hits: response.data.hits, total: response.data.totalHits };
}

 export default fetchImages;