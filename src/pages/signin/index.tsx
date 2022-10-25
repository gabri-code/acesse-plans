import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Image, Typography } from 'antd';
import { Formik, FormikHandlers, FormikHelpers } from 'formik';
import Head from 'next/head';
import { useContext, useState } from 'react';
import * as yup from 'yup';
import FormLogin from '../../components/FormLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { USER_BY_EMAIL_QUERY } from '../../graphql/queries/user/getByEmail';

import styles from '../../styles/SignIn.module.scss';
import { UserLogin } from '../../types';

const { Link } = Typography;

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [getUser] = useLazyQuery(USER_BY_EMAIL_QUERY);

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor, insira um email válido.')
      .required('Por favor, insira um email.')
      .test({
        name: 'userByEmail',
        exclusive: true,
        message: 'E-mail ou senha inválidos.',
        test: async (value) => {
          try {
            const { data } = await getUser({
              variables: {
                email: value,
              },
            });
            return !!data;
          } catch (e) {
            return false;
          }
        },
      }),
    password: yup.string().required('Por favor, insira sua senha.'),
  });

  const onSubmit = async (
    values: UserLogin,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    const response = await signIn(values);

    if (response) {
      setErrors({ email: response.message });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Entrar na minha conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['signin-page']}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
          validateOnMount={false}
        >
          {({ errors }) => {
            return <FormLogin errors={errors} loading={loading} />;
          }}
        </Formik>
      </div>
    </>
  );
};

export default SignInPage;
