import { supabase } from '@/config/supabase';
import { INewsItem } from '@/types/news.types';

import { toast } from '@/hooks/useToast';

export const NewsApi = {
  getNewsList: async () => {
    try {
      const response = await supabase.from('news').select<string, INewsItem>(`
      *,
      author (
        id,
        fullname,
        email,
        avatar
      )
    `);
      if (response.error) {
        toast({ title: response.error.message });
        throw new Error(response.error.message);
      }
      return response.data;
    } catch (error) {
      console.error('getNewsList Api Error:', error);
      return [];
    }
  },
  //   getNews: async (session: Session) => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('Newss')
  //         .select('*')
  //         .eq('id', session.user.id)
  //         .single<News>();

  //       if (error) {
  //         toast({ variant: 'destructive', title: error.message });
  //       }

  //       return data;
  //     } catch (error) {
  //       console.error('getNews Api Error:', error);
  //       return null;
  //     }
  //   },
  //   updateNews: async (id: string, params: INewsParams) => {
  //     const response = await supabase.from('Newss').update(params).eq('id', id);

  //     if (response.error) {
  //       toast({ variant: 'destructive', title: response.error.message });
  //     } else {
  //       toast({ title: 'Inforamtion successfully updated', className: 'bg-green-700' });
  //     }
  //     return response;
  //   },
};
