import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SwiperSlide } from 'swiper/react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import CustomSwiper from '../../components/CustomSwiper';
import { GET_PRODUCTS_QUERY } from '../../graphql/queries/getProducts';
import DefaultLayout from '../../layouts/Default';
import { Product, User } from '../../types';
import { GetProductsData } from '../../types/queries/Product';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { initializeApollo } from '../../graphql/client';

interface PageProps {
  title: string;
  products: Product[];
}

const formatPrice = (value: number) => value.toFixed(2);

const MercadaoPage: FC<PageProps> = ({ title, products }) => {
  console.log(products);

  return (
    <DefaultLayout title={title}>
      <Flex direction="column" w="100%">
        <Heading
          as="h2"
          size="xl"
          fontFamily="Gilroy-Light"
          color="#232425"
          mb="30px"
        >
          Mercadão Acesse
        </Heading>
        <InputGroup w="800px" size="lg" mb={10}>
          <InputLeftAddon p="0">
            <Select
              defaultValue="all"
              borderRightRadius={0}
              borderRight="none"
              size="lg"
              minW="100%"
              _focus={{
                outlineWidth: '0.01px',
                border: 'none',
              }}
            >
              <option value="all">Todos os produtos</option>
              <option value="internet">Planos de internet</option>
              <option value="tv">Planos de TV</option>
            </Select>
          </InputLeftAddon>
          <Input
            bg="#fff"
            borderLeftRadius={0}
            borderLeft="none"
            // size="lg"
            // w="500px"
            _focus={{
              outlineWidth: '0.01px',
              border: 'none',
            }}
          />
        </InputGroup>
        <VStack
          align="flex-start"
          maxW="100%"
          sx={{
            '--swiper-navigation-size': '20px',
          }}
        >
          <Text fontFamily="Gilroy-Medium" fontSize={16}>
            Planos de Internet
          </Text>
          <CustomSwiper>
            {products &&
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card
                    variant="unstyled"
                    p="10px"
                    maxW="250px"
                    bg="#fff"
                    _hover={{
                      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <CardHeader>
                      <Heading
                        size="sm"
                        fontFamily="Gilroy-Medium"
                        textAlign="center"
                        mb="10px"
                      >
                        {product.title.toUpperCase()}
                      </Heading>
                    </CardHeader>
                    <CardBody paddingY={0}>
                      <VStack>
                        <Text as="b">Serviços inclusos</Text>
                        <HStack justify="center" w="100%">
                          {product.additionalItems?.map((item) => (
                            <Tooltip key={item.id} label={item.name}>
                              <Image src={item.icon} alt={item.name} w="25px" />
                            </Tooltip>
                          ))}
                        </HStack>
                      </VStack>
                      <HStack justify="center" my="15px">
                        {!product.promotionalPrice ? (
                          <Text>R$ {formatPrice(product.price)}</Text>
                        ) : (
                          <>
                            <Text as="del">{formatPrice(product.price)}</Text>
                            {product.promotionalPrice && (
                              <Text as="b" color="red.600">
                                R${' '}
                                {
                                  formatPrice(product.promotionalPrice).split(
                                    '.'
                                  )[0]
                                }{' '}
                                <Text as="sup">
                                  {
                                    formatPrice(product.promotionalPrice).split(
                                      '.'
                                    )[1]
                                  }
                                </Text>
                              </Text>
                            )}
                          </>
                        )}
                      </HStack>
                    </CardBody>
                    <Divider my={2} />
                    <CardFooter>
                      <VStack w="100%">
                        <ButtonGroup gap="4" justifyContent="center" w="100%">
                          <Button size="sm" colorScheme="orange" flex="1">
                            Ver mais
                          </Button>
                          <Button size="sm" variant="link" flex="1">
                            Adquirir
                          </Button>
                        </ButtonGroup>
                        <Button
                          size="sm"
                          w="100%"
                          variant="outline"
                          colorScheme="green"
                        >
                          Me afiliar
                        </Button>
                      </VStack>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
          </CustomSwiper>
        </VStack>
      </Flex>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // return requireAuthentication(
  //   context,
  //   async (client: ApolloClient<NormalizedCacheObject>, user: User) => {
  const apolloClient = initializeApollo({}, context);

  const defaultProps = {
    title: 'Mercadão',
    products: [],
    // user,
  };

  try {
    const {
      data: { getProducts },
    } = await apolloClient.query<GetProductsData>({
      query: GET_PRODUCTS_QUERY,
    });

    return {
      props: {
        ...defaultProps,
        products: getProducts,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: defaultProps,
    };
  }
  // }
  // );
};

export default MercadaoPage;
