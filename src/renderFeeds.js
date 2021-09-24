const feeds = document.querySelector('.feeds');

// render Feeds
const createFeeds = (data) => {
  feeds.innerHTML = `<h2 class="card-title h4 feeds">Фиды</h2>
  <ul class="list-group border-0 rounded-0">
  ${data.map(({ title, description }) => `<li class= "list-group-item border-0 rounded-0">
  <h3 class="h6 m-0">${title}</h3>
  <p class="m-0 small text-black-50">${description}</p>
  </li>`).join('\n')}
  </ul>`;
};

export default createFeeds;
