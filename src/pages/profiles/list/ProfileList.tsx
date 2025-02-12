import { ErrorBoundary } from '@/components/Error';

import { ProfileTableList } from '@/pages/profiles/list/ProfileTableList';

export const ProfileList = () => {
  return (
    <ErrorBoundary>
      <ProfileTableList />
    </ErrorBoundary>
  );
};
