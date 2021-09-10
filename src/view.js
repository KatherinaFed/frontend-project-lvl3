import onChange from 'on-change';
import state from './state.js';

const successMessage = 'RSS успешно загружен!';

const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');
const feedback = document.querySelector('.feedback');

const createFeeds = (data) => {
  const titleFeed = data.map(({ title }) => title);
  const descriptionFeed = data.map(({ description }) => description);

  const titleFeeds = document.createElement('h2');
  titleFeeds.textContent = 'Фиды';
  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');

  h3.textContent = titleFeed;
  p.textContent = descriptionFeed;

  li.append(h3, p);
  ul.append(li);
  feeds.append(titleFeeds, ul);
};

const createPosts = (data) => {
  const titlePost = data.map(({ title }) => title);
  const urlPost = data.map(({ url }) => url);

  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const a = `<a href="${urlPost}" class="fw-bold" target="_blank" rel="noopener noreferrer">${titlePost}</a>`;
  const button = `<button type="button" class="btn btn-primary btn-sm" data-id="2" data-toggle="modal" data-target="#modal">
  Просмотр
  </button>`;

  li.append(a, button);
  ul.append(li);
  posts.append(ul);
};

const watcher = onChange(state, (path, value) => {
  switch (path) {
    case 'form.process':
      if (value === 'success') {
        feedback.textContent = successMessage;
        feedback.classList.add('text-success');
      }
      break;
    case 'form.error':
      if (value) {
        feedback.textContent = value.message;
        feedback.classList.remove('text-success');
        feedback.classList.add('text-danger');
      }
      break;
    case 'data.feeds':
      createFeeds(value);
      break;
    case 'data.posts':
      createPosts(value);
      break;
    default:
      break;
  }
});

export default watcher;
