import axios from 'axios';

const BASE_URL = 'https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles';

export const fetchArticles = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchArticleById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
