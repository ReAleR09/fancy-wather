import {
  Language, LOCALES, LANG_EN, LANG_BE,
} from './Constants';
import { weekShort as BeWeekShort, month as BeMonth } from './BelarusNames';

const formatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const getCurrentWithTimezoneOffset = (
  timeZone: string,
  language: Language,
): string => {
  let locale = '';
  if (LOCALES[language]) {
    locale = LOCALES[language];
  } else {
    locale = LOCALES[LANG_EN];
  }
  const date = new Date();
  const formatter = new Intl.DateTimeFormat(
    locale,
    {
      timeZone,
      ...formatOptions,
    },
  );
  const dateTimeString = formatter.formatToParts(date).reduce((str, part) => {
    let { value } = part;
    if (language === LANG_BE) {
      if (part.type === 'weekday') {
        value = BeWeekShort[date.getDay()];
      } else if (part.type === 'month') {
        value = BeMonth[date.getMonth()];
      }
    }
    return str + value;
  }, '');
  return dateTimeString;
};

const Time = {
  getCurrentWithTimezoneOffset,
};

export default Time;
