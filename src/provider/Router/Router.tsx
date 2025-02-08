import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { AuthRouterGuard } from "@/provider/Router/AuthRouterGuard";
// import { join } from "@/provider/Router/router.helpers";
import { AuthPageLinks, NewsPageLinks } from "@/provider/Router/router.links";
import { AuthPaths, NewsPaths } from "@/provider/Router/router.paths";

//---login--------------------------------------------------------------------
const LoginPage = lazy(() =>
  import("@/pages/login").then((module) => ({
    default: module.Login,
  }))
);

//---not-found--------------------------------------------------------------------
const NotFoundPage = lazy(() =>
  import("@/pages/404").then((module) => ({
    default: module.NotFoundPage,
  }))
);

//---react-lazy--------------------------------------------------------------
//---news--------------------------------------------------------------------
const NewsListPage = lazy(() =>
  import("@/pages/news/list").then((module) => ({
    default: module.NewsList,
  }))
);

export const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <AuthRouterGuard />,
      children: [
        {
          index: true,
          element: <Navigate to={NewsPaths.PREFIX} replace />,
        },
        //---fake-home-page---------------------------------------------
        {
          path: NewsPaths.PREFIX,
          children: [
            {
              index: true,
              element: <Navigate to={NewsPageLinks.index} replace />,
            },
            {
              path: NewsPaths.INDEX,
              element: <NewsListPage />,
            },
          ],
        },
      ],
    },
    //---login-page-and-not-found-page-------------------------------------
    {
      path: AuthPaths.ROOT_PATH,
      element: <Navigate to={AuthPageLinks.login} replace />,
    },
    {
      path: AuthPageLinks.login,
      element: <LoginPage />,
    },
    {
      path: "/404",
      element: <NotFoundPage />,
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};
