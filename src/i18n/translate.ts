import { TextKey, TranslateProps } from '../store/types/i18n';
import * as translations from './translations/index.ts';

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */


export default function translate(lang: TranslateProps, text: TextKey, plural?: number): string {

  const splitText = text.split(".")

  let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;
  // let result = translations[lang]

  if (typeof plural !== 'undefined') {
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}
