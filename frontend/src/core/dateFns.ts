import * as dateFnsLocales from 'date-fns/locale';
import { Locale } from 'date-fns';

import i18n from '../i18';

interface Locales {
  [key: string]: Locale;
}

export const getDateFnsLocale = (): Locale => {
  const locales: Locales = {
    ru: dateFnsLocales.ru,
    en: dateFnsLocales.enUS,
  };

  return locales[i18n.language];
};