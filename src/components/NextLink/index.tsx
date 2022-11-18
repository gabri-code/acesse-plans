import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface NextLinkProps {
  href: string;
  children: ReactNode;
  linkProps?: LinkProps;
}

export const CustomNextLink: FC<NextLinkProps> = ({
  href,
  children,
  linkProps,
}) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link {...linkProps}>{children}</Link>
    </NextLink>
  );
};
