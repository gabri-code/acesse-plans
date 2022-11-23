import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Badge,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Image,
  Tab,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { MdAdd, MdDelete, MdEdit, MdRemove } from 'react-icons/md';
import DefaultLayout from '../../layouts/Default';
import { AdditionalItem, Product, User } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { GET_ADDITIONAL_ITEMS_QUERY } from '../../graphql/queries/getAdditionalItems';
import { GET_PRODUCTS_QUERY } from '../../graphql/queries/getProducts';
import {
  GetAdditionalItemsData,
  GetProductsData,
} from '../../types/queries/Product';
import { DataTable } from '../../components/DataTable';
import { FormPlan } from '../../components/FormProduct';

export interface IPageProps {
  title: string;
  user: User;
  additionalItems: AdditionalItem[];
}

const formatCurrencyBRL = (value: number) => `${value.toFixed(2)}`;

const ProductsManager: NextPage<IPageProps> = ({ title, additionalItems }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product>();

  const {
    isOpen: isOpenModalNet,
    onOpen: openModalNet,
    onClose: closeModalNet,
  } = useDisclosure();

  const {
    data: getProductsData,
    refetch,
    loading,
  } = useQuery<GetProductsData>(GET_PRODUCTS_QUERY);

  const handleEditing = (value: boolean) => setIsEditing(value);

  const handleEdit = (product: Product) => {
    handleEditing(true);
    setProductToEdit(product);
    openModalNet();
  };

  const productColumnHelper = createColumnHelper<Product>();

  const productColumns = [
    productColumnHelper.accessor((row) => row, {
      cell: (info) => (
        <Flex>
          <Text as="b" mr="5px">
            {info.getValue().title}
          </Text>{' '}
          {info.getValue().active ? (
            <Badge colorScheme="green">ativo</Badge>
          ) : (
            <Badge>inativo</Badge>
          )}
        </Flex>
      ),
      header: 'Título',
    }),
    productColumnHelper.accessor('additionalItems', {
      cell: (info) => (
        <Flex gap="5px">
          {info.getValue()?.map((item) => (
            <Tooltip key={item.id} label={item.name}>
              <Image src={item.icon} alt={item.name} w="25px" />
            </Tooltip>
          ))}
        </Flex>
      ),
      header: 'Serviços Adicionais',
    }),
    productColumnHelper.accessor((row) => row, {
      cell: (info) => (
        <Flex gap="5px">
          <Text as="del">{formatCurrencyBRL(info.getValue().price)}</Text>
          {info.getValue().promotionalPrice && (
            <Text fontFamily="Gilroy-Medium" color="red.600">
              {formatCurrencyBRL(info.getValue().promotionalPrice as number)}
            </Text>
          )}
        </Flex>
      ),
      header: 'Preço',
    }),
    productColumnHelper.accessor((row) => row, {
      cell: (info) => (
        <Flex gap="5px">
          <VStack>
            <Text as="b" fontSize="12px">
              FIDELIDADE
            </Text>
            <Text>
              {formatCurrencyBRL(
                info.getValue().installationFidelity as number
              )}
            </Text>
          </VStack>
          <Center h="50px">
            <Divider orientation="vertical" />
          </Center>
          <VStack>
            <Text as="b" fontSize="12px">
              SEM FIDELIDADE
            </Text>
            <Text>
              {formatCurrencyBRL(info.getValue().installationNormal as number)}
            </Text>
          </VStack>
        </Flex>
      ),
      header: 'Instalação',
    }),
    productColumnHelper.display({
      id: 'actions',
      cell: (props) => (
        <Flex gap="5px">
          <Button
            size="sm"
            colorScheme="yellow"
            variant="outline"
            leftIcon={<MdEdit size={18} />}
            onClick={() => {
              handleEdit(props.row.original);
            }}
          >
            EDITAR
          </Button>
        </Flex>
      ),
    }),
  ];

  return (
    <DefaultLayout title={title}>
      <Flex bg="#fff" w="100%" p="10px" borderRadius="5px">
        <Tabs variant="soft-rounded" colorScheme="orange">
          <TabList>
            <Tab>Planos de Internet</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Button
                  leftIcon={<MdAdd size={18} />}
                  colorScheme="cyan"
                  size="sm"
                  onClick={openModalNet}
                >
                  ADICIONAR
                </Button>
                <DataTable
                  data={getProductsData?.getProducts ?? []}
                  columns={productColumns}
                />
              </TableContainer>
              {isOpenModalNet && (
                <FormPlan
                  closeModal={closeModalNet}
                  openModal={openModalNet}
                  isModalOpen={isOpenModalNet}
                  handleEditing={handleEditing}
                  productToEdit={productToEdit}
                  isEditing={isEditing}
                  refetchProducts={refetch}
                  additionalItems={additionalItems}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(
    context,
    async (client: ApolloClient<NormalizedCacheObject>, user: User) => {
      const defaultProps = {
        title: 'Gerenciamento de Produtos',
        additionalItems: [],
        user,
      };

      try {
        const {
          data: { getAdditional },
        } = await client.query<GetAdditionalItemsData>({
          query: GET_ADDITIONAL_ITEMS_QUERY,
        });

        console.log(getAdditional);

        return {
          props: {
            ...defaultProps,
            additionalItems: getAdditional,
          },
        };
      } catch (e) {
        console.log(e);
        return {
          props: {
            props: defaultProps,
          },
        };
      }
    }
  );
};

export default ProductsManager;
