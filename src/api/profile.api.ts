import { supabase } from '@/config/supabase';
import { IProfileItem } from '@/types/profile.types';

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
      console.error('Profile Api Error:', error);
      return [];
    }
  },
};
