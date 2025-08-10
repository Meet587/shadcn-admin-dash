import {
  AudioWaveform,
  Building,
  Building2,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  ListCheck,
  MapPin,
  Users,
  UserSearch,
} from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'Meet Rakholiya',
    email: 'meet.rakholiya.w1@gmail.com',
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
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboardIcon,
        },
        {
          title: 'Leads',
          url: '/leads',
          icon: UserSearch,
        },
        {
          title: 'Property',
          icon: Building2,
          items: [
            {
              title: 'Developers',
              url: '/developers',
              icon: Users,
            },
            {
              title: 'Projects',
              url: '/projects',
              icon: Building2,
            },
            {
              title: 'Property',
              url: '/property',
              icon: Building,
            },
          ],
        },
        // {
        //   title: 'Tasks',
        //   url: '/tasks',
        //   icon: Check,
        // },
        {
          title: 'Masters',
          icon: ListCheck,
          items: [
            {
              title: 'Locations',
              url: '/masters/locations',
              icon: MapPin,
            },
            {
              title: 'Users',
              url: '/masters/users',
              icon: Users,
            },
          ],
        },
      ],
    },
  ],
};
