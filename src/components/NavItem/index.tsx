import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { CustomNextLink } from '../NextLink';

interface NavItemProps {
  icon?: IconType;
  title: string;
  collapsed?: boolean;
  active?: boolean;
  href: string;
}

export default function NavItem({
  icon,
  title,
  collapsed,
  href,
  active,
}: NavItemProps) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={collapsed ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <CustomNextLink
          href={href}
          linkProps={{
            bg: !collapsed && active ? 'rgba(255, 123, 0, 0.1)' : 'transparent',
            borderRadius: 8,
            _hover: {
              textDecor: 'none',
              backgroundColor: '#ff7b00',
              svg: {
                color: '#fff',
              },
            },
            w: !collapsed ? '100%' : '50px',
          }}
        >
          <MenuButton w="100%" paddingY={2}>
            <Grid
              templateAreas={`"icon title"`}
              gridTemplateRows={'40px'}
              gridTemplateColumns={`50px 250px`}
            >
              <GridItem
                area="icon"
                display="flex"
                alignItems="center"
                w="100%"
                h="100%"
              >
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? '#ff7b00' : 'gray.500'}
                  w="100%"
                />
              </GridItem>
              <GridItem
                area="title"
                display="flex"
                alignItems="center"
                w="100%"
                h="100%"
              >
                <Text ml={3} display={collapsed ? 'none' : 'flex'}>
                  {title}
                </Text>
              </GridItem>
            </Grid>
          </MenuButton>
        </CustomNextLink>
      </Menu>
    </Flex>
  );
}
