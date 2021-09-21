const posts = document.querySelector('.posts');

// Предпросмотр постов
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
      postTitle.textContent = dataPosts[index].title;

      const postDescription = modal.querySelector('.modal-body');
      postDescription.textContent = dataPosts[index].description;

      const postLink = modal.querySelector('.full-article');
      postLink.href = dataPosts[index].link;

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

// Отрисовка Постов RU
const createPostsRU = (data) => {
  posts.innerHTML = `<h2 class="card-title h4 posts">Посты</h2>
  <ul class="list-group border-0 rounded-0">
  ${data.map(({ title, url }, i) => `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
  <a href="${url}" class="fw-bold" data-id=${i} target="_blank" rel="noopener noreferrer">${title}</a>
  <button type="button" class="btn btn-outline-primary btn-sm" data-id=${i} data-bs-toggle="modal" data-bs-target="#modal">
  Просмотр
  </button>
  </li>`).join('\n')}
  </ul>`;

  modalWindow(posts, data);
};

// Отрисовка Постов EN
const createPostsEN = (data) => {
  posts.innerHTML = `<h2 class="card-title h4 posts">Posts</h2>
  <ul class="list-group border-0 rounded-0">
  ${data.map(({ title, url }, i) => `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
  <a href="${url}" class="fw-bold" data-id=${i} target="_blank" rel="noopener noreferrer">${title}</a>
  <button type="button" class="btn btn-outline-primary btn-sm" data-id=${i} data-bs-toggle="modal" data-bs-target="#modal">
  Просмотр
  </button>
  </li>`).join('\n')}
  </ul>`;

  modalWindow(posts, data);
};

export { createPostsRU, createPostsEN };
