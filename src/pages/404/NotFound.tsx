import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="h-[100dvh] w-full dark:bg-gray-950">
      <div className="container flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* 404 Text with Gradient */}
          <h1 className="relative">
            <span className="text-[12rem] font-bold leading-none tracking-tight text-gray-200/20 dark:text-gray-700/20 sm:text-[15rem]">
              404
            </span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-6xl">
              Oops!
            </span>
          </h1>

          {/* Main Message */}
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            Page not found
          </h2>

          {/* Description */}
          <p className="max-w-[42rem] leading-normal text-gray-500 dark:text-gray-400 sm:text-xl sm:leading-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been removed or the link might be broken.
          </p>

          {/* Action Button */}
          <Button asChild size="lg" className="mt-4">
            <Link to="/">
              <MoveLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          {/* Decorative Elements */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 opacity-20 blur-3xl dark:from-gray-800 dark:to-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
};
