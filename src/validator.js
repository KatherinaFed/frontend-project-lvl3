import * as yup from 'yup';
import i18next from 'i18next';

const schema = yup.object().shape({
  url: yup
    .string()
    .required(i18next.t('errorMessages.rssRequired'))
    .url(i18next.t('errorMessages.invalidUrl')),
});

// Используйте эту функцию для выполнения валидации
const validateUrl = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return true;
  } catch (e) {
    return false;
  }
};

export default validateUrl;
