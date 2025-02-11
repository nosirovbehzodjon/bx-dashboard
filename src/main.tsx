import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { Toaster } from '@/components/ui/toaster';

import { RouterProvider } from '@/provider/Router/RouterProvider';
import { TanStackQueryProvider } from '@/provider/TanStackQuery';
import { ThemeProvider } from '@/provider/Theme';
import { AuthProvider } from '@/store/AuthStore/provider';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <TanStackQueryProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider>
          <App />
          <Toaster />
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </TanStackQueryProvider>,
);
