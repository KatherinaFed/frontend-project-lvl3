const parseRss = (rssString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssString, 'application/xml');

  const parserError = xml.querySelector('parsererror');
  if (parserError) {
    const error = new Error(parserError.textContent);
    error.name = 'Error parsing XML';
    throw error;
  }

  const channel = xml.querySelector('channel');
  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;

  const items = channel.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const titlePost = item.querySelector('title').textContent;
    const descriptionPost = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { titlePost, descriptionPost, link };
  });

  return { title, description, posts };
};

export default parseRss;
