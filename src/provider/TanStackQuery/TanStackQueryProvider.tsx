import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

// import { HttpCode } from '@/constants/http-code.constants';

// ----------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
      // optimizes re-renders when fetching data
      notifyOnChangeProps: ['isLoading', 'data'],
      retry: (failureCount, error) => {
        console.log(error);

        // const statusCode = parseInt(code!);

        // if (statusCode === HttpCode.UNAUTHORIZED || statusCode === HttpCode.BAD_REQUEST) {
        //   return false;
        // }

        return failureCount < 3;
      },
    },
  },
});

// ----------------------------------------------------------------

interface Props {
  children: ReactNode;
}

// ----------------------------------------------------------------

export const TanStackQueryProvider = (props: Props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
