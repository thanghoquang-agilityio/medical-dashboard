'use client';

import { memo } from 'react';
import { Divider } from '@nextui-org/react';

// Constants
import { NAVBAR_LINKS, SUPPORT_LINKS } from '@/constants';

// Components
import { Text } from '@/components/ui';
import { NavItem } from './NavbarItem';

interface NavbarProps {
  isExpandSidebar?: boolean;
}
export const Navbar = memo(({ isExpandSidebar = false }: NavbarProps) => (
  <>
    {NAVBAR_LINKS.map(({ name, href, icon, isEnable }) => (
      <NavItem
        key={name}
        name={name}
        href={href}
        isEnable={isEnable}
        icon={icon}
        isExpandSidebar={isExpandSidebar}
      />
    ))}

    {isExpandSidebar ? (
      <Text customClass="uppercase px-8 text-primary-100 mt-8">support</Text>
    ) : (
      <Divider />
    )}

    {SUPPORT_LINKS.map(({ name, href, icon }) => (
      <NavItem
        key={name}
        name={name}
        href={href}
        icon={icon}
        isExpandSidebar={isExpandSidebar}
      />
    ))}
  </>
));

Navbar.displayName = 'Navbar';
