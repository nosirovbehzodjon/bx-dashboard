import { ErrorBoundary } from '@/components/Error';

import { ProfileTableList } from '@/pages/profile/list/ProfileTableList';

export const ProfileList = () => {
  return (
    <ErrorBoundary>
      <ProfileTableList />
    </ErrorBoundary>
  );
};
