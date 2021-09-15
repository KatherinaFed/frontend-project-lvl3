import _ from 'lodash';
import validateUrl from './validator.js';
import parseData from './parser.js';
import watcher from './view.js';
import getProxyUrl from './proxy-loader.js';
import updatePosts from './updateRss.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('input');

const app = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');
    const watcherDataFeeds = watcher.data.feeds;
    const watcherDataPosts = watcher.data.posts;

    validateUrl(url, watcherDataFeeds)
      .then((link) => {
        watcher.form.error = null;
        return link;
      })
      .then((link) => getProxyUrl(link))
      .then((data) => {
        const { title, description, posts } = parseData(data);
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

        updatePosts(watcher);

        form.reset();
        input.focus();
      })
      .catch((error) => {
        watcher.form.error = error;
        watcher.form.process = 'invalid';
      });
  });
};

export default app;
