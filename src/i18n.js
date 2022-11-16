import i18n from 'i18next';
import cookie from 'react-cookies';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import languageEN from './locate/en/translate.json';
import languageFR from './locate/fr/translate.json';
import languageDE from './locate/de/translate.json';
import languageRO from './locate/ro/translate.json';
import languageES from './locate/es/translate.json';
import languageHR from './locate/hr/translate.json';
import { COOKIES_KEY } from './utility/common';

let cl = cookie.load(COOKIES_KEY.LANGUAGE_CODE) || "en";

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: languageEN,
            fr: languageFR,
            de: languageDE,
            ro: languageRO,
            es: languageES,
            hr: languageHR
        },
        /* default language when load the website in browser */
        lng: cl,
        /* When react i18next not finding any language to as default in borwser */
        fallbackLng: "en",

        debug: true,
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default',
            useSuspense: false
        }
    })

export default i18n;