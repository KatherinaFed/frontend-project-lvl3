const getItem = (element, name) => (element.querySelector(name).textContent);

const parseRss = (rssString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssString, 'application/xml');

  const parserError = xml.querySelector('parsererror');
  if (parserError) {
    throw new Error('errors.invalidRSS');
  }

  const channel = xml.querySelector('channel');
  const items = channel.querySelectorAll('item');

  const title = getItem(channel, 'title');
  const description = getItem(channel, 'description');

  const posts = [...items].map((item) => ({
    title: getItem(item, 'title'),
    description: getItem(item, 'description'),
    url: getItem(item, 'link'),
  }));

  return { title, description, posts };
};

export default parseRss;
