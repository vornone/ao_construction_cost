import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { formTranslation } from "./components/TranslationText/TranslationText";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
        ...formTranslation.en,
        },
      },
      kh: {
        translation: {
        ...formTranslation.kh,
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;





