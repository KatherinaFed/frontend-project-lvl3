import axios from 'axios';

const getProxyUrl = (url) => {
  const proxyUrl = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios.get(proxyUrl)
    .then((response) => response.data.contents)
    .catch(() => {
      throw new Error('errors.errorNetwork');
    });
};

export default getProxyUrl;
