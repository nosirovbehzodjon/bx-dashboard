import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { NewsApi } from '@/api/news.api';
import { NewsQueryKeys } from '@/provider/TanStackQuery/query.keys';

export const useNewsList = () => {
  return useQuery({
    queryKey: NewsQueryKeys.list(),
    queryFn: () => NewsApi.getNewsList(),
    placeholderData: keepPreviousData,
  });
};
