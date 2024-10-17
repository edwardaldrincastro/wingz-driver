import {
  DICTIONARY_ADDRESS_REGEX,
  DICTIONARY_ALPHABET_SPACE_REGEX,
  DICTIONARY_ALPHANUMERIC_REGEX,
  DICTIONARY_ALPHANUMERIC_SPACE_REGEX,
  DICTIONARY_AMOUNT_REGEX,
  DICTIONARY_EMAIL_REGEX,
  DICTIONARY_NON_NUMBER_REGEX,
  DICTIONARY_NUMBER_REGEX,
} from "../data";

export const isAmount = (value: string) => {
  return value.match(DICTIONARY_AMOUNT_REGEX) !== null;
};

export const isAlphaNumeric = (value: string) => {
  return value.match(DICTIONARY_ALPHANUMERIC_REGEX) !== null;
};

export const isAlphaNumericSpace = (value: string) => {
  return value.match(DICTIONARY_ALPHANUMERIC_SPACE_REGEX) !== null;
};

export const isEmail = (value: string) => {
  return value.match(DICTIONARY_EMAIL_REGEX) !== null;
};

export const isNumber = (value: string) => {
  return value.match(DICTIONARY_NUMBER_REGEX) !== null;
};

export const isNonNumber = (value: string) => {
  return value.match(DICTIONARY_NON_NUMBER_REGEX) !== null;
};

export const isAddress = (value: string) => {
  return value.match(DICTIONARY_ADDRESS_REGEX) !== null;
};

export const isAlphabetSpace = (value: string) => {
  return value.match(DICTIONARY_ALPHABET_SPACE_REGEX) !== null;
};

export const booleanTextChange = (text: string | boolean) => {
  const lowerCase = `${text}`.toLowerCase();
  if (lowerCase === "true" || lowerCase === "yes") {
    return "Yes";
  }
  if (lowerCase === "false" || lowerCase === "no") {
    return "No";
  }
  return undefined;
};
