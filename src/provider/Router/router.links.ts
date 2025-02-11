import { join } from '@/provider/Router/router.helpers';
import { AuthPaths, NewsPaths, ProfilePaths } from '@/provider/Router/router.paths';

// ---auth-page-links-----------------------------------------------------------
export const AuthPageLinks = {
  login: join(AuthPaths.ROOT_PATH, AuthPaths.LOGIN),
} as const;

// ---news-page-------------------------------------------------------------
export const NewsPageLinks = {
  index: join(NewsPaths.PREFIX, NewsPaths.INDEX),
  create: join(NewsPaths.PREFIX, NewsPaths.CREATE),
} as const;

// ---profile-page-------------------------------------------------------------
export const ProfilePageLinks = {
  index: join(ProfilePaths.PREFIX, ProfilePaths.INDEX),
  create: join(ProfilePaths.PREFIX, ProfilePaths.CREATE),
} as const;
