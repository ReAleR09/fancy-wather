import { Language } from './Constants';

export interface TranslationsTree {
  [key: string]: {
    [key: string]: string;
  }
}

const INVALID_LANG = 'Invalid language';
const INVALID_KEY = 'Invalid key';
const PLACEHOLDER = '$no_translation$';

export const createTranslator = (
  TRANSLATIONS: TranslationsTree,
) => (language: Language, key: string) => {
  if (!TRANSLATIONS[key]) {
    console.log(`${INVALID_KEY}: ${key}`);
    return PLACEHOLDER;
  }
  if (!TRANSLATIONS[key][language]) {
    console.log(`${INVALID_LANG}: ${language}`);
    return PLACEHOLDER;
  }

  return TRANSLATIONS[key][language];
};
