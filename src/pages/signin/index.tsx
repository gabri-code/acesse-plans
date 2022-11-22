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

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const { signIn, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [getUser] = useLazyQuery<User>(USER_BY_EMAIL_QUERY);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [isLargerThan800] = useMediaQuery('(min-width: 811px)');

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
    values: SignInUserInput,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    const response = await signIn(values);

    if (response) {
      setErrors({ email: response.message });
      setLoginSuccess(false);
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
    <>
      <Head>
        <title>Entrar na minha conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="100%" minH="100vh">
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
              <Flex
                w="100%"
                minH="100%"
                wrap="wrap"
                justify="center"
                align="center"
                p="15px"
                background="linear-gradient(-135deg, #c850c0, #4158d0)"
              >
                <Flex
                  w="960px"
                  bg="#fff"
                  borderRadius="10px"
                  overflow="hidden"
                  wrap="wrap"
                  justify="space-between"
                  p={{
                    base: '33px 15px 33px 15px',
                    lg: '33px 90px 33px 85px',
                    md: '33px 80px 33px 80px',
                    sm: '33px 15px 33px 15px',
                  }}
                >
                  {isLargerThan800 && (
                    <Tilt>
                      <Center w="316px" h="100%">
                        <Img
                          maxW="100%"
                          w="100%"
                          src="/images/login-art.png"
                          alt="illustration pc"
                        />
                      </Center>
                    </Tilt>
                  )}
                  <Form
                    style={{
                      width: !isLargerThan800 ? '100%' : '290px',
                    }}
                  >
                    <VStack>
                      <Image src="/images/indicash.svg" alt="logo" w="200px" />
                      <Heading
                        fontFamily="Gilroy-SemiBold"
                        fontSize="24px"
                        color="#333"
                        textAlign="center"
                        w="100%"
                        display="block"
                        pb="54px"
                      >
                        Entrar na minha conta
                      </Heading>
                    </VStack>
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
                    <Center pt="136px">
                      <CustomNextLink href="#">
                        <HStack>
                          <Text
                            color="#666"
                            w="fit-content"
                            fontFamily="Gilroy-Medium"
                          >
                            Meu primeiro acesso
                          </Text>
                          <MdOutlineArrowRightAlt />
                        </HStack>
                      </CustomNextLink>
                    </Center>
                  </Form>
                </Flex>
              </Flex>
            );
          }}
        </Formik>
      </Flex>
    </>
  );
};

export default SignInPage;
