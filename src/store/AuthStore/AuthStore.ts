import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthApi } from '@/api/domains/auth.api';
import { User } from '@/api/types/auth.types';
import {
  removeRequestHeaderToken,
  setRequestHeaderToken,
} from '@/store/AuthStore/auth.interceptors';

import { httpClient } from '@/services/http-client';

export const initialUserData: User = {
  id: NaN,
  username: '',
  first_name: '',
  last_ip: '',
  trashed: false,
  created_at: '',
  role: [
    '/switch/search-mac/index',
    '/switch/switches/trash',
    '/switch/switches/create',
    '/abonent/show',
    '/abonent/update',
    '/abonent/log',
    '/abonent/history',
  ],
  last_login: '',
  patronymic: null,
  second_name: null,
  staff_id: NaN,
  status: false,
};

interface AuthState {
  token: string;
  userCredentials: User;
  isAuthenticated: boolean;
  isInitialCheckDone: boolean;
}
// ----------------------------------------------------------------

const ACCESS_TOKEN = 'bearer-token' as const;

interface AuthState {
  persistAccessToken: (token: string) => void;
  removeAccessToken: VoidFunction;
  setUserCredentials: (user: User) => void;
  fetchUserCredentials: VoidFunction;
  initialize: VoidFunction;
  setIsInitialCheckDone: (value: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthState>()(
  persist(
    (set, get) => ({
      token: '',
      isAuthenticated: false,
      userCredentials: initialUserData,
      isInitialCheckDone: false,

      persistAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN, token);
        set(() => {
          return {
            token,
            isAuthenticated: true,
          };
        });
        setRequestHeaderToken(httpClient, token);
      },

      removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN);
        removeRequestHeaderToken(httpClient);
        set(() => {
          return {
            token: '',
            isAuthenticated: false,
            userCredentials: initialUserData,
          };
        });
      },

      setUserCredentials: (user: User) => {
        set(() => {
          return { userCredentials: user };
        });
      },

      fetchUserCredentials: async () => {
        try {
          const user = await AuthApi.getMe();
          if (user.status) {
            set(() => {
              return {
                userCredentials: { ...initialUserData, ...user.data }, //remove ...initialUserData after testing
                isAuthenticated: true,
              };
            });
          } else {
            get().removeAccessToken();
          }
        } catch (error) {
          console.error('Произошла непредвиденная ошибка:', error);
        }
      },

      initialize: async () => {
        get().setIsInitialCheckDone(true);
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          get().persistAccessToken(token);
          get().fetchUserCredentials();
        } else {
          get().removeAccessToken();
        }
      },

      setIsInitialCheckDone: (value: boolean) => {
        set(() => {
          return {
            isInitialCheckDone: value,
          };
        });
      },
    }),
    {
      name: 'auth',
    },
  ),
);
