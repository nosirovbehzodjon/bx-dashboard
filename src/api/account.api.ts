import { supabase } from '@/config/supabase';

import { toast } from '@/hooks/useToast';

export const AccountApi = {
  uploadAccountImage: async (path: string, file: File) => {
    const { error, data } = await supabase.storage
      .from('avatar')
      .upload(path, file, { upsert: true });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
      return null;
    } else {
      return data;
    }
  },
};
