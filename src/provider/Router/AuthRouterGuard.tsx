import { Navigate } from "react-router-dom";

import { AuthPageLinks } from "@/provider/Router/router.links";

import { Layout } from "@/layout";

export const AuthRouterGuard = () => {
  // const { isAuthenticated } = useAuthStore();
  // const location = useLocation();

  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Layout />;
  }

  return (
    <Navigate to={AuthPageLinks.login} state={{ from: location }} replace />
  );
};
