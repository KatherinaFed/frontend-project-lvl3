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

// Handler form.process
const handleProcess = (value) => {
  const feedback = document.querySelector('p.feedback');
  const input = document.getElementById('url-input');
  const button = document.querySelector('button[type=submit]');

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
    input.value = '';
    input.focus();
  }
};

// Errors
const handleError = (value) => {
  const feedback = document.querySelector('p.feedback');
  const input = document.getElementById('url-input');
  const button = document.querySelector('button[type=submit]');

  input.removeAttribute('readonly');
  button.disabled = false;

  if (value === null) {
    feedback.classList.remove('text-danger');
    feedback.textContent = '';
  } else {
    i18n.then((t) => {
      feedback.textContent = t(value.message);
    });
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
};

// WatcherState
const renderWatcher = (path, value) => {
  switch (path) {
    case 'form.process':
      handleProcess(value);
      break;
    case 'form.error':
      handleError(value);
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
