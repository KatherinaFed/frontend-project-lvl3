import _ from 'lodash';
import getProxyUrl from './proxy-loader.js';
import parseData from './parser.js';

const updatePosts = (state) => {
  const dataFeeds = state.data.feeds;
  dataFeeds.forEach(({ url }) => {
    getProxyUrl(url)
      .then((dataXml) => {
        const { posts } = parseData(dataXml);

        const allPosts = _.union(posts, state.data.posts);
        const newPosts = _.differenceBy(allPosts, state.data.posts, 'title');

        if (newPosts.length > 0) {
          state.data.posts = [...newPosts, ...state.data.posts];
        }
      })
      .catch(() => {});
  });

  setTimeout(() => updatePosts(state), 5000);
};

export default updatePosts;
