import { UserAddOutlined } from '@ant-design/icons';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Avatar, Button, Layout, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { MdDeleteOutline, MdEditNote } from 'react-icons/md';
import Router from 'next/router';
import { GET_ALL_USERS_QUERY } from '../../graphql/queries/user/getAll';
import DefaultLayout from '../../layoults/Default';
import {
  NewUserButton,
  TableTitle,
  TableWraper,
  UserAvatarStatus,
} from '../../styles/UserManagers';
import { PreUserResponse, Role, UserResponse } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { GET_PRE_USERS_QUERY } from '../../graphql/queries/user/getPreUsers';

export const rolesPT = {
  admin: 'Administrador',
  manager: 'Gerente',
  indicator: 'Indicador',
  test: 'Teste',
};

export interface IPageProps {
  title: string;
  users: UserResponse[];
  user: UserResponse;
  preUsers: PreUserResponse[];
}

interface DataTypeUser {
  key: string;
  name: string;
  online: boolean;
  avatar: string;
  role: Role;
}

interface DataTypePreUser {
  key: string;
  email: string;
  role: Role;
}

const UsersManager: NextPage<IPageProps> = ({
  title,
  users,
  preUsers,
  user: currUser,
}) => {
  const columns: ColumnsType<DataTypeUser> = [
    {
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: '50px',
      render: (avatar, data) => (
        <UserAvatarStatus isOnline={data.online}>
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
      render: (role: Role) => (
        <Tag color="blue" key={role}>
          {role}
        </Tag>
      ),
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

  const data: DataTypeUser[] = users
    .filter((user) => user.id !== currUser.id)
    .map((user) => ({
      key: user.id,
      name: user.fullName,
      role: rolesPT[user.role] as Role,
      online: user.active,
      avatar: user.picture,
    }));

  const preUsersColumns: ColumnsType<DataTypePreUser> = [
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Função',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => (
        <Tag color="blue" key={role}>
          {role}
        </Tag>
      ),
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
            Reenviar código de registro
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

  const preUsersData: DataTypePreUser[] = preUsers.map((user) => ({
    key: user.id,
    email: user.email,
    role: rolesPT[user.role] as Role,
  }));

  return (
    <DefaultLayout title={title}>
      <NewUserButton
        type="primary"
        icon={<UserAddOutlined />}
        size="large"
        onClick={() => Router.push(Router.pathname.concat('/novo'))}
      >
        Novo usuário
      </NewUserButton>
      <Layout>
        <TableWraper direction="vertical">
          <TableTitle level={5}>Usuários Cadastrados</TableTitle>
          <Table columns={columns} dataSource={data} scroll={{ x: 240 }} />
        </TableWraper>
        <TableWraper direction="vertical">
          <TableTitle level={5}>Usuários Pendentes</TableTitle>
          <Table
            columns={preUsersColumns}
            dataSource={preUsersData}
            scroll={{ x: 240 }}
            locale={{
              emptyText: 'Nenhum registro iniciado.',
            }}
          />
        </TableWraper>
      </Layout>
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
        data: { getAllUsers },
      } = await client.query({ query: GET_ALL_USERS_QUERY });
      const {
        data: { getPreUsers },
      } = await client.query({ query: GET_PRE_USERS_QUERY });

      return {
        props: {
          title: 'Gerenciamento de Usuários',
          users: getAllUsers,
          preUsers: getPreUsers,
          user,
        },
      };
    }
  );
};

export default UsersManager;
