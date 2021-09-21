import * as yup from 'yup';
import { ru, en } from './locales/index.js';
import state from './state.js';

const errors = {
  invalidRu: ru.translation.errors.invalidURL,
  invalidEn: en.translation.errors.invalidURL,
  duplicateRu: ru.translation.errors.rssExists,
  duplicateEn: en.translation.errors.rssExists,
};

const renderValidRU = (link, feedList) => {
  const schema = yup.string().url(errors.invalidRu);

  const promise = schema.validate(link).then((validUrl) => {
    const isDuplicate = feedList.some(({ url: addedUrl }) => validUrl === addedUrl);

    if (isDuplicate) {
      throw new Error(errors.duplicateRu);
    }

    return validUrl;
  });

  return promise;
};

const renderValidEN = (link, feedList) => {
  const schema = yup.string().url(errors.invalidEn);

  const promise = schema.validate(link).then((validUrl) => {
    const isDuplicate = feedList.some(({ url: addedUrl }) => validUrl === addedUrl);

    if (isDuplicate) {
      throw new Error(errors.duplicateEn);
    }

    return validUrl;
  });

  return promise;
};

const validateUrl = (link, feedList) => {
  if (state.lang === 'ru') {
    return renderValidRU(link, feedList);
  }
  return renderValidEN(link, feedList);
};

export default validateUrl;
