import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProfileApi } from '@/api/profile.api';
import { Profile } from '@/types/profile.types';

interface AuthState {
  session: Session | null;
  profile: Profile | null;
}

interface AuthMethods {
  setSession: (session: Session | null) => void;
  setProfile: (session: Session | null) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthMethods>()(
  persist(
    set => ({
      session: null,
      profile: null,
      setSession: session => {
        set(() => {
          return { session };
        });
      },
      setProfile: async session => {
        if (session) {
          const data = await ProfileApi.getProfile(session);
          set(() => {
            return { profile: data };
          });
        } else {
          set(() => {
            return { profile: null };
          });
        }
      },
    }),
    {
      name: 'auth',
    },
  ),
);
