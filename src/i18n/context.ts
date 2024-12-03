import React, { Context, createContext, FC, useMemo, useState } from 'react';
import translate from './translate';

/**
 * @type {React.Context<{}>}
 */
export const I18nContext: React.Context<{}> = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({ children }: {children: React.ReactNode}): I18nContext.Provider {
  const [lang, setLang] = useState('ru');

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => translate(lang, text, number),
    }),
    [lang],
  );

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
