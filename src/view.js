import onChange from 'on-change';
import i18next from 'i18next';
import state from './state.js';
import ru from './locales/ru.js';
import createFeeds from './renderFeeds.js';
import createPosts from './renderPosts.js';

const i18n = i18next.createInstance().init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

const feedback = document.querySelector('p.feedback');

const watcher = onChange(state, (path, value) => {
  switch (path) {
    case 'form.process':
      if (value === 'success') {
        i18n.then((t) => {
          feedback.textContent = t('messageSuccess.success');
        });
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
      }
      break;
    case 'form.error':
      if (value) {
        i18n.then((t) => {
          feedback.textContent = t(value.message);
        });
        feedback.classList.remove('text-success');
        feedback.classList.add('text-danger');
      }
      break;
    case 'data.feeds':
      createFeeds(value);
      break;
    case 'data.posts':
      i18n.then((t) => {
        createPosts(value, t);
      });
      break;
    default:
      throw new Error(`Unknown state at ${path} for ${value}`);
  }
});

export default watcher;
