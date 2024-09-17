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
      ? 'bg-linear-sidebar text-sky font-semibold'
      : 'hover:bg-linear-sidebar';

    return (
      <div
        className={clsx({
          'cursor-not-allowed': !isActive,
        })}
      >
        <Link
          href={href}
          className={clsx(
            'text-primary-100 text-sm flex h-[60px] gap-5 mb-2 py-5 px-8',
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
      </div>
    );
  },
);

NavItem.displayName = 'NavItem';
