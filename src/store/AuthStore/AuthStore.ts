import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  session: Session | null;
}

interface AuthMethods {
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState & AuthMethods>()(
  persist(
    set => ({
      session: null,
      setSession: session => {
        set(() => {
          return { session };
        });
      },
    }),
    {
      name: 'auth',
    },
  ),
);
