import {
  Language, LOCALES, LANG_EN, LANG_BE,
} from './Constants';
import {
  weekShort as BeWeekShort,
  month as BeMonth,
  weekLong as BeWeekLong,
} from './BelarusNames';

const formatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};


export const getNextThreeWeekDays = (
  timeZone: string,
  language: Language,
): Array<string> => {
  let locale = '';
  if (LOCALES[language] && language !== LANG_BE) {
    locale = LOCALES[language];
  } else {
    locale = LOCALES[LANG_EN];
  }

  const weekdayFormatter = new Intl.DateTimeFormat(
    locale,
    {
      timeZone,
      weekday: 'long',
    },
  );

  const date = new Date();
  const result = [];

  for (let i = 1; i <= 3; i += 1) {
    // plus 1 day
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
    let weekday: string = weekdayFormatter.format(date);
    if (language === LANG_BE) {
      weekday = BeWeekLong[weekday];
    }

    result.push(weekday);
  }

  return result;
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
