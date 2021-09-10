const parseRss = (rssString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssString, 'application/xml');

  // обработка ошибки
  const parserError = xml.querySelector('parsererror');
  if (parserError) {
    const error = new Error(parserError.textContent);
    error.name = 'Error parsing XML';
    throw error;
  }

  const channel = xml.querySelector('channel');
  const titleFeed = channel.querySelector('title').textContent;
  const descriptionFeed = channel.querySelector('description').textContent;

  const items = channel.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { title, description, link };
  });

  return { titleFeed, descriptionFeed, posts };
};

export default parseRss;
