const state = {
  lang: 'ru',
  form: {
    process: 'initial',
    error: null,
  },
  data: {
    feeds: [],
    posts: [],
  },
  visitedPost: new Set(),
  modal: {
    currentPostID: null,
  },
};

export default state;
