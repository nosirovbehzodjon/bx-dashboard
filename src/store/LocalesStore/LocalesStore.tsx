import i18n from 'i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ILocales = 'uz' | 'ru';

export const localesList: ILocales[] = ['uz', 'ru'];

interface LocalesState {
  locale: ILocales;
}

interface LocalesAction {
  setLocale: (locale: ILocales) => void;
}

export const useLocales = create<LocalesState & LocalesAction>()(
  persist(
    set => ({
      locale: 'ru',
      setLocale: (locale: ILocales) =>
        set(state => {
          i18n.changeLanguage(locale);
          return { ...state, locale: locale };
        }),
    }),
    {
      name: 'language',
    },
  ),
);
