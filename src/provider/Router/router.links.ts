import { join } from "@/provider/Router/router.helpers";
import { AuthPaths, NewsPaths } from "@/provider/Router/router.paths";

// ---auth-page-links-----------------------------------------------------------

export const AuthPageLinks = {
  login: join(AuthPaths.ROOT_PATH, AuthPaths.LOGIN),
} as const;

// ---fake-home-page-------------------------------------------------------------

export const NewsPageLinks = {
  index: join(NewsPaths.PREFIX, NewsPaths.INDEX),
} as const;
