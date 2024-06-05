import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';

const limitPage = 16;

export default async function getGallerySearch(searchImageName, page) {
  const paramsOptions = {
    client_id: 'qMYZpRTdtJgfCxIW8pybBloCAnzGDxbuyrHXMxKdr-o',
    query: searchImageName,
    orientation: 'landscape',
    content_filter: 'high',
    per_page: limitPage,
    page: page,
  };
  const searchParams = new URLSearchParams(paramsOptions);
  const response = await axios.get(`?${searchParams}`);
  return response.data;
}
