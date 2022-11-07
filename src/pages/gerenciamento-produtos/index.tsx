import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import {
  Avatar,
  Button,
  Divider,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { MdEditNote } from 'react-icons/md';
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layoults/Default';
import { NewUserButton, TableWraper } from '../../styles/UserManagers';
import { AdditionalItem, Product, UserResponse } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { FormPlan } from '../../components/FormProduct';
import { GET_ADDITIONAL_ITEMS_QUERY } from '../../graphql/queries/getAdditionalItems';
import { GET_PRODUCTS_QUERY } from '../../graphql/queries/getProducts';

export const rolesPT = {
  admin: 'Administrador',
  manager: 'Gerente',
  indicator: 'Indicador',
  test: 'Teste',
};

export interface IPageProps {
  title: string;
  user: UserResponse;
  additionalItems: AdditionalItem[];
}

interface DataTypePlan {
  key: number;
  plan: string;
  price: number;
  promotionalPrice?: number;
  additionalItems?: AdditionalItem[];
  installationNormal: number;
  installationFidelity: number;
  active: boolean;
}

const ProductsManager: NextPage<IPageProps> = ({
  title,
  additionalItems,
  user: currUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product>();

  const { data, refetch, loading } = useQuery(GET_PRODUCTS_QUERY);

  useEffect(() => {
    if (data) {
      const { getProducts } = data;

      setProducts(getProducts);
    }
  }, [data]);

  const handleModalOpen = (value: boolean) => setIsModalOpen(value);

  const handleEditing = (value: boolean) => setIsEditing(value);

  const handleEdit = (product: Product) => {
    handleEditing(true);
    console.log(product);
    setProductToEdit(product);
    handleModalOpen(true);
  };

  const columns: ColumnsType<DataTypePlan> = [
    {
      dataIndex: 'plan',
      key: 'plan',
      title: 'Plano',
      // align: 'center',
      width: '100%',
      render: (text: string, item: DataTypePlan) =>
        !item.active ? (
          <Typography.Text>
            {text} &nbsp;
            <Typography.Text strong>(Plano inativo)</Typography.Text>
          </Typography.Text>
        ) : (
          <Typography.Text>{text}</Typography.Text>
        ),
    },
    {
      title: 'Pacotes Inclusos',
      dataIndex: 'additionalItems',
      width: '100%',
      key: 'additional',
      render: (items: AdditionalItem[]) => {
        return (
          <Space>
            {items.map((item) => (
              <Tooltip key={item.id} title={item.name}>
                <Avatar src={item.icon} shape="square" />
              </Tooltip>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      width: '100%',
      key: 'price',
      render: (price: number, item: DataTypePlan) => {
        return item.promotionalPrice ? (
          <Space>
            <Typography.Text delete>{price.toFixed(2)}</Typography.Text>
            <Typography.Text type="danger">
              {item.promotionalPrice?.toFixed(2)}
            </Typography.Text>
          </Space>
        ) : (
          <Typography.Text>{price.toFixed(2)}</Typography.Text>
        );
      },
    },
    {
      title: (
        <Space direction="vertical">
          Custo de instalação
          <Space
            style={{
              height: 8,
            }}
          >
            Normal <Divider orientation="center" /> Fidelidade
          </Space>
        </Space>
      ),
      dataIndex: 'installationNormal',
      width: 300,
      key: 'installationNormal',
      render: (installationNormal: number, item: DataTypePlan) => (
        <Space align="center">
          <Typography.Text>{installationNormal.toFixed(2)}</Typography.Text>
          <Divider orientation="center" />
          <Typography.Text>
            {item.installationFidelity?.toFixed(2)}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Ação',
      key: 'action',
      width: '100%',
      render: (value, product) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<MdEditNote size={15} />}
            size="middle"
            style={{
              background: '#dea74f',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() =>
              handleEdit(
                products.find((value) => value.id === product.key) as Product
              )
            }
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource: DataTypePlan[] = products?.map((product) => ({
    key: product.id,
    installationFidelity: product.installationFidelity,
    installationNormal: product.installationNormal,
    plan: product.plan,
    price: product.price,
    active: product.active,
    additionalItems: product.additionalItems,
    promotionalPrice: product.promotionalPrice,
  }));

  return (
    <DefaultLayout title={title}>
      <Tabs
        defaultActiveKey="1"
        // onChange={onChange}
        items={[
          {
            label: `Planos de Internet`,
            key: '1',
            children: (
              <TableWraper direction="vertical">
                <NewUserButton
                  type="primary"
                  // icon={<MdAdd />}
                  size="large"
                  onClick={() => handleModalOpen(true)}
                >
                  Cadastrar plano
                </NewUserButton>
                <FormPlan
                  handleModalOpen={handleModalOpen}
                  isModalOpen={isModalOpen}
                  additionalItems={additionalItems}
                  handleEditing={handleEditing}
                  isEditing={isEditing}
                  productToEdit={isEditing ? productToEdit : undefined}
                  refetchProducts={refetch}
                />
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
                  pagination={false}
                  scroll={{ x: 240 }}
                />
              </TableWraper>
            ),
          },
          {
            label: `Planos de TV`,
            key: '2',
            children: `Content of Tab Pane 2`,
          },
        ]}
      />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(
    context,
    async (client: ApolloClient<NormalizedCacheObject>, user: UserResponse) => {
      const {
        data: {
          getAdditional: { data },
        },
      } = await client.query({ query: GET_ADDITIONAL_ITEMS_QUERY });

      return {
        props: {
          title: 'Gerenciamento de Produtos',
          additionalItems: data,
          user,
        },
      };
    }
  );
};

export default ProductsManager;
