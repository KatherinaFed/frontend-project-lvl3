import onChange from 'on-change';
import createFeeds from './renderFeeds.js';
import createPosts from './renderPosts.js';

// Handler form.process
const handleProcess = (value, i18n) => {
  const feedback = document.querySelector('p.feedback');
  const input = document.getElementById('url-input');
  const button = document.querySelector('button[type=submit]');

  if (value === 'sending') {
    input.setAttribute('readonly', 'true');
    button.disabled = true;
  }
  if (value === 'success') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    i18n.then((t) => {
      feedback.textContent = t('messageSuccess.success');
    });
    // console.log('innerHTML: ', feedback.textContent)

    input.removeAttribute('readonly');
    button.disabled = false;

    input.focus();
  }
};

// Errors
const handleError = (value, i18n) => {
  const feedback = document.querySelector('p.feedback');
  const input = document.getElementById('url-input');
  const button = document.querySelector('button[type=submit]');

  input.removeAttribute('readonly');
  button.disabled = false;

  if (value) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    i18n.then((t) => {
      feedback.textContent = t(value.message);
    });
    // console.log('innerHTML error: ' ,feedback.textContent)
  } else {
    feedback.classList.remove('text-danger');
    feedback.textContent = '';
  }
};

const watchedStateWrapper = (state, i18n) => {
  const render = (path, value) => {
    switch (path) {
      case 'form.process':
        handleProcess(value, i18n);
        break;
      case 'form.error':
        handleError(value, i18n);
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

  const watchState = onChange(state, render);

  return watchState;
};

export default watchedStateWrapper;
