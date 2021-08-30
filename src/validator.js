import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().required().url(),
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
