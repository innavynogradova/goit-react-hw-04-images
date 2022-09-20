import axios from "axios";

const API_KEY = '6120145-45c9d9fcf452f40cf8679a3e8';
const PER_PAGE = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchApi = async (searchQuery, page = 1) => {
    const response = await axios({
      params: {
            key: `${API_KEY}`,
            q: searchQuery,
            page,
            per_page: `${PER_PAGE}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
      },
    });
  
    return response.data;
  };

  