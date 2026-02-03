import Link from "next/link";
import React, { forwardRef } from "react";

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

/**
 * Link compatível com `asChild` (shadcn/ui).
 * Renderiza um `<a>` real para o Slot poder clonar.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, prefetch, replace, scroll, ...rest }, ref) => {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        legacyBehavior
        passHref
      >
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  },
);

AppLink.displayName = "AppLink";

