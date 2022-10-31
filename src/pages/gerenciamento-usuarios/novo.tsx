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
import { message } from 'antd';
import FormPreRegister from '../../components/FormPreRegister';
import { GET_ALL_USERS_QUERY } from '../../graphql/queries/user/getAll';
import DefaultLayout from '../../layoults/Default';
import { Role, UserResponse } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { PRE_USER_REGISTER_MUTATION } from '../../graphql/mutations/user/preRegister';

const phoneRegExp =
  /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

interface FormValues {
  email: string;
  roles: Role[];
}

const initialValues: FormValues = {
  email: '',
  roles: [],
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
    10
  );
};

const UsersManager: NextPage<IPageProps> = ({ title, users }) => {
  const [preUserRegister, { loading }] = useMutation(
    PRE_USER_REGISTER_MUTATION
  );

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      await preUserRegister({
        variables: {
          data: values,
        },
      });
      success(values.email);
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
    roles: yup.array().min(1, 'Insira pelo menos 1 função.'),
  });

  return (
    <DefaultLayout title={title}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors }) => <FormPreRegister errors={errors} loading={loading} />}
      </Formik>
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
