import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import Head from 'next/head';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import Tilt from 'react-parallax-tilt';
import { useMediaQuery } from '@chakra-ui/react';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { FormControl } from '../../components/FormControl';
import { AuthContext } from '../../contexts/AuthContext';
import { USER_BY_EMAIL_QUERY } from '../../graphql/queries/user/getByEmail';
import { CustomNextLink } from '../../components/NextLink';
import { SignInUserInput } from '../../types/inputs/SignIn';
import { User } from '../../types';
import LoginRegisterLayout from '../../layouts/LoginRegister';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const { adminSignIn, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [getUser] = useLazyQuery<User>(USER_BY_EMAIL_QUERY);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [isLargerThan800] = useMediaQuery('(min-width: 811px)');

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor, insira um email válido.')
      .required('Por favor, insira um email.'),
    password: yup.string().required('Por favor, insira sua senha.'),
  });

  const onSubmit = async (
    values: SignInUserInput,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    const response = await adminSignIn(values);

    if (response && response.error) {
      setErrors({ email: response.error.message });
      setLoginSuccess(false);
      setLoading(false);
      return;
    }

    setLoading(false);
    setLoginSuccess(true);
  };

  const formRef = useRef<FormikProps<FormValues>>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formRef.current?.setFieldTouched(e.target.name, true);
    formRef.current?.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <LoginRegisterLayout title="Entrar na minha conta">
      {/* <Head>
        <title>Entrar na minha conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={LoginSchema}
        validateOnBlur
        innerRef={formRef}
      >
        {({ errors, values, touched }) => {
          console.log(errors, values);
          return (
            <Form
              style={{
                width: !isLargerThan800 ? '100%' : '290px',
              }}
            >
              <FormControl
                label="E-mail"
                placeholder="joão@gmail.com"
                name="email"
                type="email"
                error={errors?.email}
                touched={touched.email}
                isRequired
                onChange={handleChange}
              />
              <FormControl
                label="Senha"
                name="password"
                type="password"
                error={errors?.password}
                touched={touched.password}
                isRequired
                onChange={handleChange}
              />
              <Button
                isLoading={loading}
                loadingText="Entrando"
                type="submit"
                w="100%"
                bg="#E46A19"
                color="#fff"
                mt="20px"
                disabled={loginSuccess}
                _hover={{ bg: 'rgba(228, 106, 25, 0.75)' }}
              >
                Entrar
              </Button>
              <Center pt="12px">
                <CustomNextLink href="#">
                  <Text color="#666" fontFamily="Gilroy-Medium">
                    Esqueci meu e-mail/senha
                  </Text>
                </CustomNextLink>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </LoginRegisterLayout>
  );
};

export default SignInPage;
