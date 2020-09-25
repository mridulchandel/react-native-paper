import validator from 'validator';

export const isEmpty = (value) => {
  return validator.isEmpty(value.trim());
};

export const isEmail = (value) => {
  return validator.isEmail(value);
};

export const isPhone = (value) => {
  console.log(value, 'value');
  return validator.isLength(value.trim(), {
    min: 10,
  });
};
