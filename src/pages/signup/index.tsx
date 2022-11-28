import { useLazyQuery } from '@apollo/client';
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Img,
  Text,
  useRadioGroup,
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
import { RolesPT, User } from '../../types';
import LoginRegisterLayout from '../../layouts/LoginRegister';
import { RadioCard } from '../../components/RadioCard';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  fullName: '',
};

const rolesPT: RolesPT = {
  customer: 'Sou cliente',
  indicator: 'Quero ser indicador',
};

const SignUpPage = () => {
  const { signIn, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [isLargerThan800] = useMediaQuery('(min-width: 811px)');

  const RegisterSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor, insira um email válido.')
      .required('E-mail é obrigatório.'),
    fullName: yup
      .string()
      .test('fullName', 'Insira seu nome completo.', (value) => {
        if (value && value?.replace(/\s+/g, ' ').trim().split(' ').length <= 1)
          return false;
        return true;
      })
      .required('Nome é obrigatório.'),
    password: yup
      .string()
      .required('Senha é obrigatório.')
      .min(8, 'Senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas não conferem.'),
  });

  const onSubmit = async (
    values: SignInUserInput,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
  };

  const formRef = useRef<FormikProps<FormValues>>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formRef.current?.setFieldTouched(e.target.name, true);
    formRef.current?.setFieldValue(
      e.target.name,
      e.target.value.replace(/\s+/g, ' ').trim()
    );
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: 'customer',
    onChange: (value) => formRef.current?.setFieldValue('role', value),
  });

  const group = getRootProps();

  const roles = ['customer', 'indicator'];

  return (
    <LoginRegisterLayout title="Criar uma conta">
      {/* <Head>
        <title>Entrar na minha conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={RegisterSchema}
        validateOnBlur
        innerRef={formRef}
      >
        {({ errors, values, touched }) => {
          return (
            <Form
              style={{
                width: !isLargerThan800 ? '100%' : '290px',
              }}
            >
              <FormControl
                label="Nome"
                placeholder="João Alberto"
                name="fullName"
                error={errors?.fullName}
                touched={touched.fullName}
                isRequired
                onChange={handleChange}
              />
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
              <FormControl
                label="Confirmar senha"
                name="passwordConfirmation"
                type="password"
                error={errors?.passwordConfirmation}
                touched={touched.passwordConfirmation}
                isRequired
                onChange={handleChange}
              />
              <HStack {...group} w="100%">
                {roles.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} name="role" type="radio" {...radio}>
                      {rolesPT[value as keyof RolesPT]}
                    </RadioCard>
                  );
                })}
              </HStack>
              <Button
                isLoading={loading}
                loadingText="Entrando"
                type="submit"
                w="100%"
                borderRadius="full"
                bg="#E46A19"
                color="#fff"
                mt="20px"
                // disabled={loginSuccess}
                _hover={{ bg: 'rgba(228, 106, 25, 0.75)' }}
              >
                Criar conta
              </Button>
              <Center pt="136px" w="100%">
                <Flex w="100%" justifyContent="center">
                  Já tenho cadastro &nbsp;
                  <CustomNextLink href="#">
                    <HStack w="fit-content">
                      <Text
                        color="#666"
                        w="fit-content"
                        fontFamily="Gilroy-Medium"
                      >
                        Entrar.
                      </Text>
                      <MdOutlineArrowRightAlt />
                    </HStack>
                  </CustomNextLink>
                </Flex>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </LoginRegisterLayout>
  );
};

export default SignUpPage;
