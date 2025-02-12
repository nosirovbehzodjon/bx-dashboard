import { Session } from '@supabase/supabase-js';

import { supabase } from '@/config/supabase';
import { IProfileItem, IProfileParams, Profile } from '@/types/profile.types';

import { toast } from '@/hooks/useToast';

export const ProfileApi = {
  getProfileList: async () => {
    try {
      const response = await supabase.from('profiles').select<string, IProfileItem>('*');
      if (response.error) {
        toast({ title: response.error.message });
        throw new Error(response.error.message);
      }
      return response.data;
    } catch (error) {
      console.error('getProfileList Api Error:', error);
      return [];
    }
  },
  getProfile: async (session: Session) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single<Profile>();

      if (error) {
        toast({ variant: 'destructive', title: error.message });
      }

      return data;
    } catch (error) {
      console.error('getProfile Api Error:', error);
      return null;
    }
  },
  updateProfile: async (id: string, params: IProfileParams) => {
    try {
      const { error, data } = await supabase.from('profiles').update(params).eq('id', id);

      if (error) {
        toast({ variant: 'destructive', title: error.message });
      }

      return data;
    } catch (error) {
      console.error('getProfile Api Error:', error);
      return null;
    }
  },
};
