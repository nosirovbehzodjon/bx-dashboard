import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { AuthRouterGuard } from '@/provider/Router/AuthRouterGuard';
// import { join } from "@/provider/Router/router.helpers";
import {
  AccountPageLinks,
  AuthPageLinks,
  NewsPageLinks,
  ProfilePageLinks,
} from '@/provider/Router/router.links';
import { AccountPaths, AuthPaths, NewsPaths, ProfilePaths } from '@/provider/Router/router.paths';

//---react-lazy---------------------------------------------------------------

//---login--------------------------------------------------------------------
const LoginPage = lazy(() =>
  import('@/pages/login').then(module => ({
    default: module.Login,
  })),
);

//---not-found---------------------------------------------------------------
const NotFoundPage = lazy(() =>
  import('@/pages/404').then(module => ({
    default: module.NotFoundPage,
  })),
);

//---news--------------------------------------------------------------------
const NewsListPage = lazy(() =>
  import('@/pages/news/list').then(module => ({
    default: module.NewsList,
  })),
);

const NewsCreatePage = lazy(() =>
  import('@/pages/news/create').then(module => ({
    default: module.NewsCreate,
  })),
);

//---profile--------------------------------------------------------------------
const ProfileListPage = lazy(() =>
  import('@/pages/profiles/list').then(module => ({
    default: module.ProfileList,
  })),
);

const ProfileCreatePage = lazy(() =>
  import('@/pages/profiles/create').then(module => ({
    default: module.ProfileCreate,
  })),
);

//---account--------------------------------------------------------------------
const AccountPage = lazy(() =>
  import('@/pages/account').then(module => ({
    default: module.AccountPage,
  })),
);

export const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <AuthRouterGuard />,
      children: [
        {
          index: true,
          element: <Navigate to={NewsPaths.PREFIX} replace />,
        },
        //---account-page---------------------------------------------
        {
          path: AccountPaths.PREFIX,
          children: [
            {
              index: true,
              element: <Navigate to={AccountPageLinks.index} replace />,
            },
            {
              path: AccountPaths.INDEX,
              element: <AccountPage />,
            },
          ],
        },
        //---news-page---------------------------------------------
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
            {
              path: NewsPaths.CREATE,
              element: <NewsCreatePage />,
            },
          ],
        },
        //---profile-page---------------------------------------------
        {
          path: ProfilePaths.PREFIX,
          children: [
            {
              index: true,
              element: <Navigate to={ProfilePageLinks.index} replace />,
            },
            {
              path: ProfilePaths.INDEX,
              element: <ProfileListPage />,
            },
            {
              path: ProfilePaths.CREATE,
              element: <ProfileCreatePage />,
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
      path: '/404',
      element: <NotFoundPage />,
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
