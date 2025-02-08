import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  initialSwitchRoutes,
  initialSwitchShowRoutes,
} from '@/store/RouteStore/config/switch.config';

export interface IRouteNavigationItem {
  id: string;
  to?: string;
  label: string;
  icon: string;
  collapsed: boolean;
  children: IRouteNavigationItem[] | null;
}

export interface IRouteNavigation {
  keys: string[];
  title: string;
  list: IRouteNavigationItem[];
}

// interface RoutesState {
//   routes: Record<string, INavigation>;
// }

// interface RoutesAction {
//   setRoutes: (routes: Record<string, INavigation>) => void;
//   setRoutesByKey: (key: string, ordered: INavigation) => void;
// }

interface RoutesState {
  currentId: string;
  switch: IRouteNavigation;
  switchShow: IRouteNavigation;
}

interface RoutesAction {
  setCurrentId: (id: string) => void;
  setSwitch: (orderedSwitch: IRouteNavigation) => void;
  setSwitchShow: (orderedSwitchShow: IRouteNavigation) => void;
}

export const useRoutes = create<RoutesState & RoutesAction>()(
  persist(
    (set, get) => ({
      currentId: '1',
      switch: initialSwitchRoutes,
      switchShow: initialSwitchShowRoutes(get().currentId),
      setCurrentId: (id: string) =>
        set(() => {
          return { currentId: id };
        }),
      setSwitch: (orderedSwitch: IRouteNavigation) =>
        set(() => {
          return { switch: orderedSwitch };
        }),
      setSwitchShow: (orderedSwitchShow: IRouteNavigation) =>
        set(() => {
          return { switchShow: orderedSwitchShow };
        }),
    }),
    {
      name: 'routes',
    },
  ),
);
