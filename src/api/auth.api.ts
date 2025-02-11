import { supabase } from '@/config/supabase';
import { ILoginFromParams } from '@/types/login.types';

export const AuthApi = {
  signInWithPassword: async (params: ILoginFromParams) => {
    return await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });
  },
};
