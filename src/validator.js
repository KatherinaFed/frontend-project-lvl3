import * as yup from 'yup';

const validateUrl = (link, feedList) => {
  const schema = yup.string().url('errors.invalidURL');

  const promise = schema.validate(link).then((validUrl) => {
    const isDuplicate = feedList.some(({ url: addedUrl }) => validUrl === addedUrl);

    if (isDuplicate) {
      throw new Error('errors.rssExists');
    }

    return validUrl;
  });

  return promise;
};

export default validateUrl;
