import onChange from 'on-change';
import state from './state.js';
import { ru, en } from './locales/index.js';
import { createFeedsEN, createFeedsRU } from './renderFeeds.js';
import { createPostsEN, createPostsRU } from './renderPosts.js';
import changeLang from './changeLang.js';

changeLang(state);

const messages = {
  success: {
    ru: ru.translation.success,
    en: en.translation.success,
  },
  error: {
    ru: ru.translation.errors.errorNetwork,
    en: en.translation.errors.errorNetwork,
  },
};

const feedback = document.querySelector('.feedback');

const watcher = onChange(state, (path, value) => {
  switch (path) {
    case 'form.process':
      if (value === 'success') {
        if (state.lang === 'ru') {
          feedback.textContent = messages.success.ru;
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
        } else {
          feedback.textContent = messages.success.en;
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
        }
      }
      break;
    case 'form.error':
      if (value) {
        if (state.lang === 'ru') {
          feedback.textContent = value.message;
          feedback.classList.remove('text-success');
          feedback.classList.add('text-danger');
        } else {
          feedback.textContent = value.message;
          feedback.classList.remove('text-success');
          feedback.classList.add('text-danger');
        }
      }
      break;
    case 'data.feeds':
      if (state.lang === 'ru') {
        createFeedsRU(value);
      } else {
        createFeedsEN(value);
      }
      break;
    case 'data.posts':
      if (state.lang === 'ru') {
        createPostsRU(value);
      } else {
        createPostsEN(value);
      }
      break;
    default:
      break;
  }
});

export default watcher;
