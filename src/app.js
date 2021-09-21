import _ from 'lodash';
import validateUrl from './validator.js';
import parseData from './parser.js';
import watcher from './view.js';
import getProxyUrl from './proxy-loader.js';
import updatePosts from './updateRss.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('input');
const allPosts = document.querySelector('.posts');

// Клик на Пост
const clickOnPost = (e) => {
  const index = e.target.dataset.id;
  const links = document.querySelectorAll('.fw-bold');
  links.forEach((link) => {
    const currLink = link.getAttribute('data-id');
    if (index === currLink) {
      link.classList.remove('fw-bold');
      link.classList.add('fw-normal', 'link-secondary');
    }
  });
};

const app = () => {
  allPosts.addEventListener('click', (e) => clickOnPost(e));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');
    const watcherDataFeeds = watcher.data.feeds;
    const watcherDataPosts = watcher.data.posts;

    validateUrl(url, watcherDataFeeds)
      .then((link) => getProxyUrl(link))
      .then((dataXml) => {
        const { title, description, posts } = parseData(dataXml);
        const id = _.uniqueId();

        watcherDataFeeds.unshift({
          id,
          url,
          title,
          description,
        });

        const dataPosts = posts.map((post) => ({ ...post, feedId: id }));
        watcherDataPosts.unshift(...dataPosts);
        watcher.form.process = 'success';

        e.target.reset();
        input.focus();
      })
      .catch((error) => {
        watcher.form.error = error;
        watcher.form.process = 'invalid';
      });

    setTimeout(() => updatePosts(watcher), 5000);
  });
};

export default app;
