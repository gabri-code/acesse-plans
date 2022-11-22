import { UserAddOutlined } from '@ant-design/icons';
import {
  ApolloClient,
  NormalizedCacheObject,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import { format, isBefore, isToday, parseISO, isTomorrow } from 'date-fns';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import {
  MdAssignmentInd,
  MdDelete,
  MdNoAccounts,
  MdRefresh,
  MdSentimentNeutral,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import {
  Badge,
  Button,
  Flex,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  TableContainer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { GET_ALL_USERS_QUERY } from '../../graphql/queries/user/getAll';
import DefaultLayout from '../../layouts/Default';
import { PreUser, RolesPT, User } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { GET_PRE_USERS_QUERY } from '../../graphql/queries/user/getPreUsers';
import { DataTable } from '../../components/DataTable';
import { CustomAvatar } from '../../components/CustomAvatar';
import FormPreRegister from '../../components/FormPreRegister';
import { GetPreUsersData, GetUsersData } from '../../types/queries/User';
import { DELETE_PRE_USER } from '../../graphql/mutations/user/deletePreUser';

export const rolesPT: RolesPT = {
  admin: 'Administrador',
  indicator: 'Indicador',
};

export interface IPageProps {
  title: string;
  users: User[];
  user: User;
  preUsers: PreUser[];
}

const UsersManager: NextPage<IPageProps> = ({ title, user: currUser }) => {
  const [
    { pageIndex: preUserPageIndex, pageSize: preUserPageSize },
    setPreUserPagination,
  ] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [
    { pageIndex: userPageIndex, pageSize: userPageSize },
    setUserPagination,
  ] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const preUserPagination = useMemo(
    () => ({
      pageIndex: preUserPageIndex,
      pageSize: preUserPageSize,
    }),
    [preUserPageIndex, preUserPageSize]
  );

  const userPagination = useMemo(
    () => ({
      pageIndex: userPageIndex,
      pageSize: userPageSize,
    }),
    [userPageIndex, userPageSize]
  );

  const [
    getPreUsers,
    {
      loading: preUsersLoading = true,
      data: preUsersData,
      refetch: refetchPreUsers,
    },
  ] = useLazyQuery<GetPreUsersData>(GET_PRE_USERS_QUERY);

  const [getUsers, { loading: usersLoading = true, data: usersData }] =
    useLazyQuery<GetUsersData>(GET_ALL_USERS_QUERY);

  const [deletePreUser, { loading: deletePreUserLoading }] =
    useMutation(DELETE_PRE_USER);

  useEffect(() => {
    (async () => {
      const take = preUserPageSize * (preUserPageIndex + 1);
      const skip = take - preUserPageSize;

      await getPreUsers({
        variables: {
          take,
          skip,
        },
      });
    })();
  }, [preUserPageIndex, preUserPageSize, getPreUsers]);

  useEffect(() => {
    (async () => {
      const take = userPageSize * (userPageIndex + 1);
      const skip = take - userPageSize;

      await getUsers({
        variables: {
          take,
          skip,
        },
      });
    })();
  }, [userPageSize, userPageIndex, getUsers]);

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const usersWithoutMe = usersData?.getAllUsers.data.filter(
    (user) => user.id !== currUser.id
  );

  const preUserColumnHelper = createColumnHelper<PreUser>();

  const preUserColumns = [
    preUserColumnHelper.accessor('email', {
      header: 'E-mail',
      cell: (info) => info.getValue(),
    }),
    preUserColumnHelper.accessor('role', {
      header: 'Função',
      cell: (info) => (
        <Badge colorScheme="teal">
          {rolesPT[info.getValue() as keyof RolesPT]}
        </Badge>
      ),
    }),
    preUserColumnHelper.accessor((row) => row, {
      header: 'Expiração da chave de registro',
      cell: (info) => {
        const { otpExpiresAt } = info.getValue();

        const parsedDate = parseISO(otpExpiresAt);

        const isExpired = isBefore(parsedDate, new Date());

        const expirationString = isToday(parsedDate)
          ? "'Irá expirar hoje às' HH 'horas e' mm 'minutos.'"
          : isTomorrow(parsedDate)
          ? "'Irá expirar amanhã às' HH 'horas e' mm 'minutos.'"
          : "'Irá expirar no dia ' dd/MM/yyyy 'às' HH 'horas e' mm 'minutos.'";

        return !isExpired ? (
          <Badge colorScheme="green">
            {format(parsedDate, expirationString)}
          </Badge>
        ) : (
          <Badge colorScheme="red">EXPIRADO</Badge>
        );
      },
    }),
    preUserColumnHelper.display({
      id: 'actions',
      cell: (props) => {
        const parsedDate = parseISO(props.row.original.otpExpiresAt);

        const isExpired = isBefore(parsedDate, new Date());

        return (
          <Flex gap={1} justify="flex-end">
            {isExpired && (
              <Button
                size="sm"
                variant="outline"
                colorScheme="cyan"
                leftIcon={<MdRefresh size={18} />}
              >
                Reenviar código
              </Button>
            )}
            <Tooltip label="Excluir registro">
              <IconButton
                size="sm"
                aria-label="exclude register"
                icon={<MdDelete size={18} />}
                colorScheme="red"
                isLoading={deletePreUserLoading}
                onClick={async () => {
                  try {
                    await deletePreUser({
                      variables: { id: props.row.original.id },
                    });
                    refetchPreUsers();
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </Tooltip>
          </Flex>
        );
      },
    }),
  ];

  const userColumnHelper = createColumnHelper<User>();

  const userColumns = [
    userColumnHelper.accessor((row) => row, {
      header: 'Nome',
      cell: (info) => {
        const { picture, fullName } = info.getValue();
        return (
          <HStack>
            <CustomAvatar
              src={picture}
              name={fullName}
              size="md"
              modePreview="tooltip"
            />
            <Text fontFamily="Gilroy-Medium">{fullName}</Text>
          </HStack>
        );
      },
    }),
    userColumnHelper.accessor('role', {
      header: 'Função',
      cell: (info) => (
        <Badge colorScheme="teal">
          {rolesPT[info.getValue() as keyof RolesPT]}
        </Badge>
      ),
    }),
    userColumnHelper.accessor('email', {
      header: 'E-mail',
      cell: (info) => info.getValue(),
    }),
    userColumnHelper.accessor('phone', {
      header: 'Telefone',
      cell: (info) => info.getValue(),
    }),
    userColumnHelper.accessor('active', {
      header: 'Online?',
      cell: (info) =>
        info.getValue() ? (
          <Badge colorScheme="green">ONLINE</Badge>
        ) : (
          <Badge colorScheme="red">OFFLINE</Badge>
        ),
    }),
    userColumnHelper.display({
      id: 'actions',
      cell: (props) => (
        <Flex gap={1}>
          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            leftIcon={<MdAssignmentInd size={18} />}
            onClick={() =>
              router.push(`${router.pathname}/${props.row.original.id}`)
            }
          >
            Ver Perfil
          </Button>
          <Tooltip label="Desabilitar usuário">
            <IconButton
              size="sm"
              aria-label="disable user"
              icon={<MdNoAccounts size={18} />}
              colorScheme="yellow"
            />
          </Tooltip>
          <Tooltip label="Excluir usuário">
            <IconButton
              size="sm"
              aria-label="exclude user"
              icon={<MdDelete size={18} />}
              colorScheme="red"
            />
          </Tooltip>
        </Flex>
      ),
    }),
  ];

  return (
    <DefaultLayout title={title}>
      <VStack w="100%">
        <VStack w="100%" bg="#fff" padding="10px" borderRadius="5px">
          <Flex
            justify="space-between"
            w="100%"
            bg="rgba(0, 0, 0, 0.04)"
            p="8px 10px"
            align="center"
            borderRadius="5px"
          >
            <Text fontFamily="Gilroy-Medium">Usuários Cadastrados</Text>
            <Button
              leftIcon={<UserAddOutlined />}
              size="sm"
              colorScheme="facebook"
              onClick={onOpen}
            >
              Novo usuário
            </Button>
          </Flex>
          <TableContainer w="100%" paddingX="10px">
            {!usersWithoutMe?.length ? (
              <VStack justify="center">
                <MdSentimentNeutral size={30} color="rgba(0, 0, 0, 0.3)" />
                <Text color="rgba(0, 0, 0, 0.3)">
                  Nenhum usuário cadastrado.
                </Text>
              </VStack>
            ) : usersLoading ? (
              <Stack>
                <Skeleton height="41.5px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
              </Stack>
            ) : (
              <DataTable
                data={usersWithoutMe ?? []}
                columns={userColumns}
                pagination={userPagination}
                setPagination={setUserPagination}
                dataLength={usersData?.getAllUsers.count ?? 0}
              />
            )}
          </TableContainer>
        </VStack>
        <VStack w="100%" bg="#fff" padding="10px" borderRadius="5px">
          <Flex
            justify="space-between"
            w="100%"
            bg="rgba(0, 0, 0, 0.04)"
            p="8px 10px"
            align="center"
            borderRadius="5px"
          >
            <Text fontFamily="Gilroy-Medium">Usuários Pendentes</Text>
          </Flex>
          <TableContainer w="100%" paddingX="10px">
            {!preUsersData?.getPreUsers.data.length ? (
              <VStack justify="center">
                <MdSentimentNeutral size={30} color="rgba(0, 0, 0, 0.3)" />
                <Text color="rgba(0, 0, 0, 0.3)">
                  Nenhum cadastro iniciado.
                </Text>
              </VStack>
            ) : preUsersLoading ? (
              <Stack>
                <Skeleton height="41.5px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
                <Skeleton height="65px" />
              </Stack>
            ) : (
              <DataTable
                data={preUsersData?.getPreUsers.data ?? []}
                columns={preUserColumns}
                pagination={preUserPagination}
                setPagination={setPreUserPagination}
                dataLength={preUsersData?.getPreUsers.count ?? 0}
              />
            )}
          </TableContainer>
        </VStack>
      </VStack>
      <FormPreRegister
        isOpen={isOpen}
        onClose={onClose}
        refetchPreUsers={refetchPreUsers}
      />
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
        title: 'Gerenciamento de Usuários',
        user,
        users: [],
        preUsers: [],
      };

      try {
        return {
          props: {
            ...defaultProps,
          },
        };
      } catch (e) {
        console.log(e);
        return {
          props: defaultProps,
        };
      }
    }
  );
};

export default UsersManager;
