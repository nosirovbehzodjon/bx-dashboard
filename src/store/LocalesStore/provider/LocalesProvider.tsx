import { ReactNode, useEffect } from 'react';

import { useLocales } from '@/store/LocalesStore';

import i18n from '@/services/i18n';

interface ILocalesProvider {
  children: ReactNode;
}
export const LocalesProvider = (props: ILocalesProvider) => {
  const { children } = props;
  const { locale } = useLocales();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n.language]);

  return children;
};
