import { ru, en } from './locales/index.js';
import state from './state.js';

const errors = {
  ru: ru.translation.errors.invalidRSS,
  en: en.translation.errors.invalidRSS,
};

const getError = () => {
  if (state.lang === 'ru') {
    const error = new Error(errors.ru);
    error.name = 'Error parsing XML';
    throw error;
  } else {
    const error = new Error(errors.en);
    error.name = 'Error parsing XML';
    throw error;
  }
};

const getItem = (element, name) => (element.querySelector(name).textContent);

const parseRss = (rssString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssString, 'application/xml');

  const parserError = xml.querySelector('parsererror');
  if (parserError) {
    getError();
  }

  const channel = xml.querySelector('channel');
  const items = channel.querySelectorAll('item');

  const title = getItem(channel, 'title');
  const description = getItem(channel, 'description');

  const posts = [...items].map((item) => ({
    title: getItem(item, 'title'),
    description: getItem(item, 'description'),
    url: getItem(item, 'link'),
  }));

  return { title, description, posts };
};

export default parseRss;
