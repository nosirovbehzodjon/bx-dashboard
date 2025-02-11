import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 opacity-20 blur-3xl dark:from-gray-800 dark:to-gray-900 md:h-[40rem] md:w-[40rem]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 px-4">
        <h1 className="relative">
          <span className="text-[6rem] font-bold leading-none tracking-tight text-gray-200/60 dark:text-gray-700/20 sm:text-[10rem] md:text-[15rem]">
            404
          </span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Oops!
          </span>
        </h1>

        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl">
          Page not found
        </h2>

        <p className="max-w-lg leading-normal text-gray-500 dark:text-gray-400 sm:text-lg sm:leading-7 md:text-xl md:leading-8">
          Sorry, we couldn't find the page you're looking for. It might have been removed or the
          link might be broken.
        </p>

        <Button asChild size="lg" className="mt-4">
          <Link to="/">
            <MoveLeft className="mr-2 h-5 w-5" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};
