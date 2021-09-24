import _ from 'lodash';
import validateUrl from './validator.js';
import parseData from './parser.js';
import watcher from './view.js';
import getProxyUrl from './proxy-loader.js';
import updatePosts from './updateRss.js';

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

// Init function
const app = () => {
  const form = document.querySelector('form');
  const allPosts = document.querySelector('.posts');

  const state = {
    form: {
      process: 'initial',
      error: null,
    },
    data: {
      feeds: [],
      posts: [],
    },
  };

  const watchedState = watcher(state);

  // Click on the post
  allPosts.addEventListener('click', (e) => clickOnPost(e));

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');
    const watcherDataFeeds = watchedState.data.feeds;
    const watcherDataPosts = watchedState.data.posts;

    validateUrl(url, watcherDataFeeds)
      .then((link) => {
        watchedState.form.process = 'sending';
        return getProxyUrl(link);
      })
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
        watchedState.form.process = 'success';
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.process = 'invalid';
      });

    setTimeout(() => updatePosts(watchedState), 5000);
  });
};

export default app;
