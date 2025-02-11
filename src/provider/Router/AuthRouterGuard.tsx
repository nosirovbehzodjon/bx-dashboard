import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Layout } from '@/layout';
import { AuthPageLinks } from '@/provider/Router/router.links';
import { useAuthStore } from '@/store/AuthStore/AuthStore';

export const AuthRouterGuard = () => {
  const { session } = useAuthStore();
  const location = useLocation();

  if (session) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  return <Navigate to={AuthPageLinks.login} state={{ from: location }} replace={true} />;
};
