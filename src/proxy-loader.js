import axios from 'axios';

const getProxyUrl = (url) => {
  const proxyUrl = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;

  return axios.get(proxyUrl)
    .then((response) => response.data.contents);
};

export default getProxyUrl;
