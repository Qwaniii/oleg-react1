import React, {  createContext, FC, useMemo, useState } from 'react';
import translate from './translate';
import { I118nProviderProps, TextKey, TranslateProps, TranslateType } from '../store/types/i18n';

/**
 * @type {React.Context<{}>}
 */
export const I18nContext: React.Context<TranslateType> = createContext({} as TranslateType);

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */


export const I18nProvider: React.FC<I118nProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<TranslateProps>('ru');

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text: TextKey, number?: number) => translate(lang, text, number),
    }),
    [lang],
  );

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
