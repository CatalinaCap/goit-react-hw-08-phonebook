import axios from 'axios';

const BASE_URL = 'https://connections-api.goit.global';
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token is missing!');
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const fetchContacts = async () => {
  const { data } = await api.get('/contacts');
  return data;
};
export const addContact = async contact => {
  const { data } = await api.post('/contacts', contact);
  return data;
};
export const deleteContact = async id => {
  await api.delete(`/contacts/${id}`);
  return id;
};
export default api;
