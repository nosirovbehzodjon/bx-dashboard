import { ErrorBoundary } from '@/components/Error';

import { NewsTableList } from '@/pages/news/list/NewsTableList';

export const NewsList = () => {
  return (
    <ErrorBoundary>
      <NewsTableList />
    </ErrorBoundary>
  );
};
