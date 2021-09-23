import axios from 'axios';
import { ru, en } from './locales/index.js';
import state from './state.js';

const getProxyUrl = (url) => {
  const proxyUrl = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios.get(proxyUrl)
    .then((response) => response.data.contents)
    .catch(() => {
      if (state.lang === 'ru') {
        throw new Error(ru.translation.errors.errorNetwork);
      }
      throw new Error(en.translation.errors.errorNetwork);
    });
};

export default getProxyUrl;
