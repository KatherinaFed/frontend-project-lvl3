import valideUrl from './validator.js';

const errorMessage = {
  invalideUrl: 'Сcылка должна быть валидным URL',
  duplicate: 'RSS уже существует',
};

// Заголовок FEEDS
// const createFeedHead = () => {
//   const divCardBody = document.createElement('div');
//   divCardBody.classList.add('card', 'border-0');
//   const divBody = document.createElement('div');
//   divBody.classList.add('card-body');
//   const h2 = document.createElement('h2');
//   h2.classList.add('card-title', 'h4');
//   h2.textContent = 'Feeds';
//   divBody.append(h2);
//   divCardBody.append(divBody);

//   return divCardBody;
// };

// Заголовок POSTS;
const createPostHead = () => {
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card', 'border-0');
  const divBody = document.createElement('div');
  divBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Posts';
  divBody.append(h2);
  divCardBody.append(divBody);

  return divCardBody;
};

// ссылки на посты
const createPostItems = (item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const a = document.createElement('a');
  a.setAttribute('href', `${item.url}`);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
  a.classList.add('fw-bold');
  a.textContent = `${item.url}`;
  li.append(a);

  return li;
};

// Название и описание Feeds
const createFeedItems = (item) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  const header = document.createElement('h3');
  header.classList.add('h6', 'm-0');
  header.textContent = item.url;
  const description = document.createElement('p');
  description.classList.add('m-0', 'small', 'text-black-50');
  description.textContent = item.url;
  li.append(header, description);

  return li;
};

// Создание списка ссылок
const createPostAndFeed = () => {
  const divPosts = document.querySelector('.posts');
  const divFeeds = document.querySelector('.feeds');

  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const p = document.querySelector('.feedback');

  const arrayLinks = [];

  // Feeds ul
  const ulFeed = document.createElement('ul');
  ulFeed.classList.add('list-group', 'border-0', 'rounded-0');

  // Posts ul
  const ulPost = document.createElement('ul');
  ulPost.classList.add('list-group', 'border-0', 'rounded-0');

  // Обработка <form>
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newForm = new FormData(e.target);
    const obj = Object.fromEntries(newForm);
    const validate = valideUrl(obj); // валидация ссылки
    divPosts.append(ulPost);
    divFeeds.append(ulFeed);

    if (validate === true && !arrayLinks.includes(obj.url)) {
      arrayLinks.push(obj.url);

      // Заголовок Posts
      const headPost = createPostHead();
      divPosts.prepend(headPost);

      // Заголовок Feeds
      // const headFeed = createFeedHead();
      // divFeeds.prepend(headFeed);

      const linksPosts = createPostItems(obj);
      const linksFeeds = createFeedItems(obj);

      ulPost.prepend(linksPosts);
      ulFeed.prepend(linksFeeds);

      input.classList.remove('is-invalid');
      p.classList.add('text-success');
      p.textContent = 'RSS успешно загружен!';
    } else if (arrayLinks.includes(obj.url)) {
      input.classList.add('is-invalid');
      p.classList.add('text-danger');
      p.textContent = (errorMessage.duplicate);
    } else {
      input.classList.add('is-invalid');
      p.classList.add('text-danger');
      p.textContent = errorMessage.invalideUrl;
    }
    form.reset();
    input.focus();
  });
};

export default createPostAndFeed;
