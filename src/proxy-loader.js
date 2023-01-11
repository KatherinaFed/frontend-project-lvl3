import axios from 'axios';

const getProxyUrl = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;

  return axios.get(proxyUrl)
    .then((response) => response.data.contents)
    .catch(() => {
      throw new Error('errors.errorNetwork');
    });
};

export default getProxyUrl;
