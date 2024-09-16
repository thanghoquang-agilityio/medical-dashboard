'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { NAVBAR_LINKS } from '@/constants';

export const Navbar = () => {
  const pathname = usePathname() || '/';

  return (
    <>
      {NAVBAR_LINKS.map((link) => {
        const { name, href, icon, active } = link || {};
        const LinkIcon = icon;
        const isActive = pathname.includes(href);

        const activeClass = isActive
          ? 'bg-linear-sidebar text-sky font-semibold'
          : 'hover:bg-linear-sidebar';

        return (
          <div
            className={clsx({
              'cursor-not-allowed': !isActive,
            })}
            key={name}
          >
            <Link
              href={href}
              className={clsx(
                'text-primary-100 text-sm flex h-[60px] gap-5 mb-2 py-5 px-8 items-center',
                {
                  'pointer-events-none': pathname !== href && !active,
                },
                activeClass,
              )}
            >
              <div className="w-[17px] h-[17px]">
                <LinkIcon />
              </div>
              <p>{link.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};
