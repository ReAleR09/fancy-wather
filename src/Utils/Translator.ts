import { Language } from './Constants';

export interface TranslationsTree {
  [key: string]: {
    [key: string]: string;
  }
}

const PLACEHOLDER = '$no_translation$';

export const createTranslator = (
  TRANSLATIONS: TranslationsTree,
) => (language: Language, key: string) => {
  if (!TRANSLATIONS[key]) {
    return PLACEHOLDER;
  }
  if (!TRANSLATIONS[key][language]) {
    return PLACEHOLDER;
  }

  return TRANSLATIONS[key][language];
};
