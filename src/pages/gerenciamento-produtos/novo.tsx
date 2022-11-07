import {
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
} from '@apollo/client';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { message, Tabs } from 'antd';
import FormPreRegister from '../../components/FormPreRegister';
import { GET_ALL_USERS_QUERY } from '../../graphql/queries/user/getAll';
import DefaultLayout from '../../layoults/Default';
import { Role, UserResponse } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { PRE_USER_REGISTER_MUTATION } from '../../graphql/mutations/user/preRegister';

interface FormValues {
  email: string;
  role: Role;
}

const initialValues: FormValues = {
  email: '',
  role: 'indicator',
};

export const rolesPT = {
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

const success = (email: string) => {
  message.success(
    `Cadastro iniciado com sucesso. Um código de registro foi enviado para o email ${email}.`,
    5
  );
};

const UsersManager: NextPage<IPageProps> = ({ title }) => {
  const [preUserRegister, { loading }] = useMutation(
    PRE_USER_REGISTER_MUTATION
  );

  const handleSubmit = async (
    values: FormValues,
    { setErrors, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await preUserRegister({
        variables: {
          data: values,
        },
      });
      success(values.email);
      resetForm();
    } catch (error: any) {
      setErrors({ email: error.message });
    }
  };

  const schema = yup.object().shape({
    // phone: yup.string().matches(phoneRegExp, 'Telefone inválido.'),
    email: yup
      .string()
      .email('E-mail inválido.')
      .required('E-mail obrigatório.'),
    role: yup.string().required('Insira a função desse usuário.'),
  });

  return (
    <DefaultLayout title={title}>
      <Tabs
        defaultActiveKey="1"
        // onChange={onChange}
        items={[
          {
            label: `Planos de Internet`,
            key: '1',
            children: `Content of Tab Pane 1`,
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
      console.log('aqui');
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
