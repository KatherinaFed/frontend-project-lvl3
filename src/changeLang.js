import { ru, en } from './locales/index.js';

// Смена языка
const changeLang = (state) => {
  const inputsLang = document.querySelectorAll('[data-lang]');
  inputsLang.forEach((input) => {
    input.addEventListener('click', (e) => {
      e.preventDefault();

      state.lang = e.target.dataset.lang;

      const active = document.querySelector('.active');

      active.classList.remove('btn-light', 'active');
      active.classList.add('btn-outline-light');

      e.target.parentElement.classList.remove('btn-outline-light');
      e.target.parentElement.classList.add('btn-light', 'active');

      const submit = document.querySelector('button.btn-lg');
      const floatingDiv = document.querySelector('.form-floating');
      const headFeeds = document.querySelector('h2.feeds');
      const headPosts = document.querySelector('h2.posts');
      const view = document.querySelectorAll('button.btn-outline-primary');
      const divModal = document.querySelector('.modal-footer');
      const read = divModal.querySelector('a');
      const close = divModal.querySelector('button');

      if (state.lang === 'en') {
        submit.textContent = en.translation.buttons.add;
        floatingDiv.querySelector('label').textContent = 'RSS link';
        view.forEach((v) => {
          v.textContent = en.translation.buttons.view;
        });
        read.textContent = en.translation.buttons.read;
        close.textContent = en.translation.buttons.close;
        if (Boolean(headFeeds) && Boolean(headPosts)) {
          headFeeds.textContent = en.translation.feeds;
          headPosts.textContent = en.translation.posts;
        }
      } else {
        submit.textContent = ru.translation.buttons.add;
        floatingDiv.querySelector('label').textContent = 'Ссылка RSS';
        view.forEach((v) => {
          v.textContent = ru.translation.buttons.view;
        });
        read.textContent = ru.translation.buttons.read;
        close.textContent = ru.translation.buttons.close;
        if (Boolean(headFeeds) && Boolean(headPosts)) {
          headFeeds.textContent = ru.translation.feeds;
          headPosts.textContent = ru.translation.posts;
        }
      }
    });
  });
};

export default changeLang;
