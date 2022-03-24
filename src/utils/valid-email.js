import isEmail from 'validator/lib/isEmail';

export const validEmail = (text) => isEmail(text);
