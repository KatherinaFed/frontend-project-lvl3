import onChange from 'on-change';
import state from './state.js';

const successMessage = 'RSS успешно загружен!';

const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');
const feedback = document.querySelector('.feedback');

const readLinks = (links, index) => {
  links.forEach((link) => {
    const linkId = link.getAttribute('data-id');

    if (linkId === index) {
      link.classList.remove('fw-bold');
      link.classList.add('fw-normal', 'link-secondary');
    }
  });
};

const modalWindow = (divPosts, dataPosts) => {
  const buttonShowModal = divPosts.querySelectorAll('[data-bs-toggle="modal"]');
  buttonShowModal.forEach((openModal) => {
    openModal.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('body').classList.add('modal-open');
      const modal = document.getElementById('modal');
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.removeAttribute('aria-hidden');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');

      const index = e.currentTarget.getAttribute('data-id');
      const postTitle = modal.querySelector('.modal-title');
      postTitle.textContent = dataPosts[index].titlePost;

      const postDescription = modal.querySelector('.modal-body');
      postDescription.textContent = dataPosts[index].descriptionPost;

      const postLink = modal.querySelector('.full-article');
      postLink.href = dataPosts[index].link;

      const allLinks = document.querySelectorAll('.fw-bold');
      readLinks(allLinks, index);

      const closeModal = document.querySelectorAll('[data-bs-dismiss="modal"]');
      closeModal.forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelector('body').classList.remove('modal-open');

          modal.classList.remove('show');
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
          modal.removeAttribute('aria-modal');
          modal.removeAttribute('role');
        });
      });
    });
  });
};

const createFeeds = (data) => {
  feeds.innerHTML = `<h2 class="card-title h4">Фиды</h2>
  <ul class="list-group border-0 rounded-0">
  ${data.map(({ title, description }) => `<li class= "list-group-item border-0 rounded-0">
  <h3 class="h6 m-0">${title}</h3>
  <p class="m-0 small text-black-50">${description}</p>
  </li>`).join('\n')}
  </ul>`;
};

const createPosts = (data) => {
  posts.innerHTML = `<h2 class="card-title h4">Посты</h2>
  <ul class="list-group border-0 rounded-0">
  ${data.map(({ titlePost, link }, i) => `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
  <a href="${link}" class="fw-bold" data-id=${i} target="_blank" rel="noopener noreferrer">${titlePost}</a>
  <button type="button" class="btn btn-outline-primary btn-sm" data-id=${i} data-bs-toggle="modal" data-bs-target="#modal">
  Просмотр
  </button>
  </li>`).join('\n')}
  </ul>`;

  modalWindow(posts, data);
};

const watcher = onChange(state, (path, value) => {
  switch (path) {
    case 'form.process':
      if (value === 'success') {
        feedback.textContent = successMessage;
        feedback.classList.remove('text-danger');
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
