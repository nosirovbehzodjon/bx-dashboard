import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Newspaper,
  Settings2,
  User,
  UserCircle,
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavMain } from '@/layout/Sidebar/NavMain';
import { NavProjects } from '@/layout/Sidebar/NavProjects';
import { NavUser } from '@/layout/Sidebar/NavUser';
import { TeamSwitcher } from '@/layout/Sidebar/TeamSwitcher';
import { AccountPageLinks, NewsPageLinks, ProfilePageLinks } from '@/provider/Router/router.links';
import { NewsPaths, ProfilePaths } from '@/provider/Router/router.paths';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'News',
      url: NewsPaths.PREFIX,
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: 'List',
          url: NewsPageLinks.index,
        },
        {
          title: 'Create',
          url: NewsPageLinks.create,
        },
        {
          title: 'Tresh',
          url: '#',
        },
      ],
    },
    {
      title: 'Profile',
      url: ProfilePaths.PREFIX,
      icon: User,
      items: [
        {
          title: 'List',
          url: ProfilePageLinks.index,
        },
        {
          title: 'Create',
          url: ProfilePageLinks.create,
        },
        {
          title: 'Tresh',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Account',
      url: AccountPageLinks.index,
      icon: UserCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
