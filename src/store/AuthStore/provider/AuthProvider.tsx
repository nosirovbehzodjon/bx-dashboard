import { ReactNode, useEffect } from 'react';

import { supabase } from '@/config/supabase';
import { useAuthStore } from '@/store/AuthStore/AuthStore';

interface IAuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = (props: IAuthProviderProps) => {
  const { setSession } = useAuthStore();
  const { children } = props;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return children;
};
