import { ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/store/AuthStore/AuthStore';

interface IAuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = (props: IAuthProviderProps) => {
  const { isInitialCheckDone, initialize } = useAuthStore();
  const { children } = props;

  useEffect(() => {
    initialize();
  }, []);

  if (!isInitialCheckDone) {
    return null;
  }

  return children;
};
