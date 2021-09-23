import onChange from 'on-change';
import i18next from 'i18next';
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

const renderWatcher = (path, value) => {
  const feedback = document.querySelector('p.feedback');
  const input = document.getElementById('url-input');
  const button = document.querySelector('button[type=submit]');

  switch (path) {
    case 'form.process':
      if (value === 'sending') {
        input.classList.remove('is-invalid');
        input.setAttribute('readonly', 'true');
        button.disabled = true;
      }
      if (value === 'success') {
        i18n.then((t) => {
          feedback.textContent = t('messageSuccess.success');
        });
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
        input.removeAttribute('readonly');
        button.disabled = false;
      }
      break;
    case 'form.error':
      if (value) {
        i18n.then((t) => {
          feedback.textContent = t(value.message);
        });
        feedback.classList.remove('text-success');
        feedback.classList.add('text-danger');
        input.removeAttribute('readonly');
        button.disabled = false;
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
};

export default (state) => onChange(state, renderWatcher);
