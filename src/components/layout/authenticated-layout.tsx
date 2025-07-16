import { AppSidebar } from '@/components/layout/app-sidebar';
import SkipToMain from '@/components/skip-to-main';
import { SidebarProvider } from '@/components/ui/sidebar';
// import { SearchProvider } from '@/context/search-context';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Outlet } from 'react-router';
import { ProfileDropdown } from '../profile-dropdown';
import { ThemeSwitch } from '../theme-switch';
import { Header } from './header';
import { TopNav } from './top-nav';

interface Props {
  children?: React.ReactNode;
}

export function AuthenticatedLayout({ children }: Props) {
  const defaultOpen = true;
  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
          )}
        >
          {/* ===== Top Heading ===== */}
          <Header>
            <TopNav links={topNav} />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          {children ? children : <Outlet />}
        </div>
      </SidebarProvider>
    </div>
  );
}

const topNav = [
  {
    title: 'Overview',
    href: '/dashboard',
    isActive: true,
    disabled: true,
  },
  {
    title: 'Customers',
    href: '/dashboard',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: '/dashboard',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: '/dashboard',
    isActive: false,
    disabled: true,
  },
];
