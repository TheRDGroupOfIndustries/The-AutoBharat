"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  to: string;
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    const pathname = usePathname();
    const basePath = to.split('?')[0];
    const isActive = pathname === basePath || (basePath !== '/' && pathname?.startsWith(`${basePath}/`));
    const isPending = false; // Next.js doesn't natively expose pending on link

    const computedClassName = typeof className === 'function' ? className({ isActive, isPending }) : cn(className, isActive && activeClassName, isPending && pendingClassName);

    return (
      <Link
        ref={ref}
        href={to}
        className={computedClassName}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
