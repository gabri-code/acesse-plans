import NextLink, { LinkProps } from 'next/link';
import { Link, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface CustomNextLinkProps extends LinkProps {
  children: ReactNode;
  linkProps?: ChakraLinkProps;
}

export const CustomNextLink: FC<CustomNextLinkProps> = ({
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
