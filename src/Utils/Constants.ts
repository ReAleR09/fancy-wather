export type Language = 'EN' | 'RU' | 'BE';
export const LANG_EN = 'EN';
export const LANG_RU = 'RU';
export const LANG_BE = 'BE';

export const LANG_NAMES = [
  LANG_EN,
  LANG_RU,
  LANG_BE,
];

export type Temperature = 'C' | 'F';
export const TEMP_C = 'C';
export const TEMP_F = 'F';

type Locales = {
  [key: string]: string;
}

export const LOCALES: Locales = {
  [LANG_RU]: 'ru-RU',
  [LANG_EN]: 'en-US',
  [LANG_BE]: 'be-BY',
};

export const STORAGE_LANG = 'STORAGE_LANG';
export const STORAGE_TEMP_TYPE = 'STORAGE_TEMP_TYPE';
