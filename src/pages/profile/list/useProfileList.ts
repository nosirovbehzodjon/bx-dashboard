import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { ProfileApi } from '@/api/profile.api';
import { ProfileQueryKeys } from '@/provider/TanStackQuery/query.keys';

export const useProfileList = () => {
  return useQuery({
    queryKey: ProfileQueryKeys.list(),
    queryFn: () => ProfileApi.getProfileList(),
    placeholderData: keepPreviousData,
  });
};
