import * as yup from 'yup';

const messages = {
  invalid: 'Ссылка должна быть валидным URL',
  duplicate: 'RSS уже существует',
};

const validateUrl = (url, list) => {
  const schema = yup.string().url(messages.invalid);
  const promise = schema.validate(url).then((validUrl) => {
    const isDuplicate = list.some(({ url: addedUrl }) => validUrl === addedUrl);

    if (isDuplicate) {
      throw new Error(messages.duplicate);
    }
    return validUrl;
  });

  return promise;
};

export default validateUrl;
