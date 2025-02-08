import { SwitchPageLinks } from '@/provider/RouterProvider/router.links';
import { IRouteNavigation } from '@/store/RouteStore/RouteStore';

//---initial-switch-list--------------------------------------------
export const initialSwitchRoutes: IRouteNavigation = {
  keys: ['switch/switches/index'],
  title: 'Управление свитчами',
  list: [
    {
      id: '1',
      label: 'Список',
      icon: 'List',
      to: SwitchPageLinks.list,
      collapsed: false,
      children: null,
    },
    {
      id: '2',
      label: 'Корзина',
      icon: 'Trash',
      to: SwitchPageLinks.trash,
      collapsed: false,
      children: null,
    },
    {
      id: '3',
      label: 'Добавить новый',
      icon: 'Plus',
      to: SwitchPageLinks.create,
      collapsed: false,
      children: null,
    },
  ],
};

export const initialSwitchShowRoutes = (id: string): IRouteNavigation => {
  return {
    keys: [],
    title: 'Управление свитчами',
    list: [
      ...initialSwitchRoutes.list,
      {
        id: '4',
        label: 'Порты',
        icon: 'Dots',
        to: SwitchPageLinks.port(id),
        collapsed: false,
        children: null,
      },
      {
        id: '5',
        label: 'Лог изменений',
        icon: 'Clock',
        to: SwitchPageLinks.log(id),
        collapsed: false,
        children: null,
      },
    ],
  };
};
