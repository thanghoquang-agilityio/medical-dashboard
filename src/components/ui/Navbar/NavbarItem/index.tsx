import { ComponentType, memo } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  name: string;
  href: string;
  isEnable?: boolean;
  isExpandSidebar?: boolean;
  icon: ComponentType;
}

export const NavItem = memo(
  ({ name, href, icon: Icon, isEnable, isExpandSidebar }: NavItemProps) => {
    const pathname = usePathname() || '/';
    const isActive = pathname.includes(href);

    const activeClass = isActive
      ? 'bg-linear-sidebar text-secondary-100 font-semibold'
      : 'hover:bg-linear-sidebar';

    return (
      <li
        className={clsx({
          'cursor-not-allowed': !isActive,
        })}
      >
        <Link
          href={href}
          aria-label={name}
          className={clsx(
            'text-primary-100 text-sm flex h-[60px] gap-5 mb-[1px] py-5 px-8 lg:px-10',
            {
              'pointer-events-none': pathname !== href && !isEnable,
            },
            { 'justify-center': !isExpandSidebar },
            activeClass,
          )}
        >
          <div className="w-[17px] h-[17px]">
            <Icon />
          </div>
          {isExpandSidebar && <p>{name}</p>}
        </Link>
      </li>
    );
  },
);

NavItem.displayName = 'NavItem';
