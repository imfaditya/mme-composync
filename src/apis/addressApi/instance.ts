import axios from 'axios';

const addressApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_ADDRESS_API_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
});

export default addressApiInstance;
