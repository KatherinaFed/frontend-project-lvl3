import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
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

   const i18n = i18next.createInstance().init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const state = {
    form: {
      process: 'filling',
      error: null,
    },
    data: {
      feeds: [],
      posts: [],
    },
  };

  const watchedState = watcher(state, i18n);

  // Click on the post
  allPosts.addEventListener('click', (e) => clickOnPost(e));

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');
    console.log(url)

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

        e.target.reset();
      })
      .catch((error) => {
        watchedState.form.error = error;
        // watchedState.form.process = 'invalid';
      });

    setTimeout(() => updatePosts(watchedState), 5000);
  });
};

export default app;
