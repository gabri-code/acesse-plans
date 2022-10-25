import { UserAddOutlined } from '@ant-design/icons';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Avatar, Button, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { MdDeleteOutline, MdEditNote } from 'react-icons/md';
import { GET_ALL_USERS_QUERY } from '../../graphql/queries/user/getAll';
import DefaultLayout from '../../layoults/Default';
import { NewUserButton, UserAvatarStatus } from '../../styles/UserManagers';
import { UserResponse } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';

const rolesPT = {
  admin: 'Administrador',
  manager: 'Gerente',
  seller: 'Vendedor',
  test: 'Teste',
};

export interface IPageProps {
  title: string;
  users: UserResponse[];
  user: UserResponse;
}

interface DataType {
  key: string;
  name: string;
  online: boolean;
  avatar: string;
  role: string[];
}

const UsersManager: NextPage<IPageProps> = ({ title, users }) => {
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: '50px',
      render: (avatar, data) => (
        <UserAvatarStatus userOnline={data.online}>
          <Avatar src={avatar} />
        </UserAvatarStatus>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Função',
      dataIndex: 'role',
      key: 'role',
      render: (roles: string[]) =>
        roles.map((role) => (
          <Tag color="blue" key={role}>
            {role}
          </Tag>
        )),
    },
    {
      title: 'Ação',
      key: 'action',
      width: '200px',
      render: () => (
        <Space size="middle">
          <Button
            type="primary"
            icon={
              <MdEditNote
                size={15}
                style={{
                  marginRight: 5,
                }}
              />
            }
            size="middle"
            style={{
              background: '#dea74f',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Editar permissões
          </Button>
          <Button
            type="primary"
            icon={
              <MdDeleteOutline
                size={15}
                style={{
                  marginRight: 5,
                }}
              />
            }
            size="middle"
            style={{
              background: '#aa3838',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Remover
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = users.map((user) => ({
    key: user.id,
    name: user.fullName,
    role: user.role.map((role) => rolesPT[role]),
    online: user.active,
    avatar:
      'https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg',
  }));

  return (
    <DefaultLayout title={title}>
      <NewUserButton type="primary" icon={<UserAddOutlined />} size="large">
        Novo usuário
      </NewUserButton>
      <Table columns={columns} dataSource={data} />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(
    context,
    async (client: ApolloClient<NormalizedCacheObject>, user: UserResponse) => {
      const { data } = await client.query({ query: GET_ALL_USERS_QUERY });

      return {
        props: {
          title: 'Gerenciamento de Usuários',
          users: data.getAllUsers,
          user,
        },
      };
    }
  );
};

export default UsersManager;
