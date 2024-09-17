'use client';

// Constants
import { NAVBAR_LINKS_MINI } from '@/constants';

// Components
import { LogoutIcon } from '@/icons';
import { NavItem } from '../NavbarItem';
import { Button } from '@/components/ui';

export const MiniNavbar = () => (
  <div className="max-w-[108px]">
    {NAVBAR_LINKS_MINI.map(({ name, href, icon }) => (
      <NavItem key={name} name={name} href={href} icon={icon} isExpandSidebar />
    ))}
    <Button color="stone">
      <LogoutIcon />
    </Button>
  </div>
);
