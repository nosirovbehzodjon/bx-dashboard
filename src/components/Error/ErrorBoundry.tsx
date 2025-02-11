'use client';

import { AlertCircle } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-destructive" aria-hidden="true" />
              </div>
              <CardTitle className="text-center text-2xl font-bold">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
              {this.state.error && (
                <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded-md">
                  {this.state.error.message}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
              >
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
