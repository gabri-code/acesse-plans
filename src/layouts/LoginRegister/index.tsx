import { Center, Flex, Heading, Image, Img, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { FC, ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';
import { useMediaQuery } from '@chakra-ui/react';

interface PageProps {
  title: string;
  children: ReactNode;
}

const LoginRegisterLayout: FC<PageProps> = ({ title, children }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 811px)');

  console.log(title);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex w="100%" minH="100vh">
        <Flex
          w="100%"
          minH="100%"
          wrap="wrap"
          justify="center"
          align="center"
          p="15px"
          background="linear-gradient(-135deg, #c850c0, #4158d0)"
        >
          <Flex
            w="960px"
            bg="#fff"
            borderRadius="10px"
            overflow="hidden"
            wrap="wrap"
            justify="space-between"
            p={{
              base: '33px 15px 33px 15px',
              lg: '33px 90px 33px 85px',
              md: '33px 80px 33px 80px',
              sm: '33px 15px 33px 15px',
            }}
          >
            {isLargerThan800 && (
              <Tilt>
                <Center w="316px" h="100%">
                  <Img
                    maxW="100%"
                    w="100%"
                    src="/images/login-art.png"
                    alt="illustration pc"
                    transition="all 0.15s ease"
                    _hover={{
                      transform: 'scale(1.1)',
                    }}
                  />
                </Center>
              </Tilt>
            )}
            <VStack>
              <VStack>
                <Image src="/images/indicash.svg" alt="logo" w="200px" />
                <Heading
                  fontFamily="Gilroy-SemiBold"
                  fontSize="24px"
                  color="#333"
                  textAlign="center"
                  w="100%"
                  display="block"
                  pb="54px"
                  pt="20px"
                >
                  {title}
                </Heading>
              </VStack>
              {children}
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginRegisterLayout;
