import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: false,
    detection: {
      order: ["localStorage","queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
      format: function (value, format, lng) {
        if (format === "number") {
          let finish: undefined | [string, string];
          switch (lng) {
            case "ru": {
              finish = [" тыс.", " млн."];
              break;
            }
            case "en": {
              finish = ["K", "M"];
              break;
            }
            default: {
              finish = ["K", "M"];
            }
          }
          const number = <number>value;
          if (number < 10 * 1e3) {
            return number.toLocaleString(lng);
          }
          if (number < 1 * 1e6) {
            const newNumber = ~~(number / 100) / 10; // 745662 => 7456 => 745.6
            return `${newNumber.toLocaleString(lng)}${finish[0]}`;
          } else {
            const newNumber = ~~(number / (100 * 1e3)) / 10;
            return `${newNumber.toLocaleString(lng)}${finish[1]}`;
          }

        } else if (format === "localeString") {
          return value.toLocaleString(lng);
        }
      },
    },
  });

export default i18n;
