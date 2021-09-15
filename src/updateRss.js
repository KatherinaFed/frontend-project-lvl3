import _ from 'lodash';
import getProxyUrl from './proxy-loader.js';
import parseUrl from './parser.js';

const getNewPosts = (oldPosts, newPosts) => _.differenceBy(oldPosts, newPosts, 'title');
const makeId = (posts) => posts.map((post) => ({ id: _.uniqueId(), ...post }));

const updatePosts = (state) => {
  const dataFeeds = state.data.feeds;
  dataFeeds.forEach(({ url }) => {
    getProxyUrl(url)
      .then((data) => {
        const { posts } = parseUrl(data);
        const newPosts = getNewPosts(state.data.posts, posts);
        state.data.posts.push(...makeId(newPosts));
      })
      .catch(() => {});
  });

  setTimeout(() => updatePosts(state), 5000);
};

export default updatePosts;
