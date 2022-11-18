import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface NextLinkProps {
  href: string;
  children: ReactNode;
}

export const CustomNextLink: FC<NextLinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link>{children}</Link>
    </NextLink>
  );
};
