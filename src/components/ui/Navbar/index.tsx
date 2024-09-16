'use client';

// Constants
import { NAVBAR_LINKS, SUPPORT_LINKS } from '@/constants';

// Components
import { NavItem } from './NavItem';
import { Text } from '@/components/ui';

export const Navbar = () => (
  <>
    <div>
      {NAVBAR_LINKS.map(({ name, href, icon, isEnable }) => (
        <NavItem
          key={name}
          name={name}
          href={href}
          isEnable={isEnable}
          icon={icon}
        />
      ))}
    </div>
    <div className="mt-8">
      <Text customClass="uppercase px-8 text-primary-100">support</Text>
      <div>
        {SUPPORT_LINKS.map(({ name, href, icon }) => (
          <NavItem key={name} name={name} href={href} icon={icon} />
        ))}
      </div>
    </div>
  </>
);
