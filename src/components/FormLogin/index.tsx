import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormikErrors, FormikFormProps } from 'formik';
import { FC } from 'react';
import { Image } from 'antd';
import { Container, FirstAccess, ForgotPassword, StyledButton } from './style';
import Field from '../Field';

interface IFormLogin extends FormikFormProps {
  errors?: FormikErrors<{
    email: string;
    password: string;
  }>;
  loading?: boolean;
}

const FormLogin: FC<IFormLogin> = ({ errors, loading, ...props }) => {
  console.log(loading);
  return (
    <Container {...props}>
      <Image
        src="/images/logo.png"
        alt="logo"
        preview={false}
        style={{ width: 200 }}
      />
      <Field
        placeholder="joão@acesse.com.br"
        prefix={<UserOutlined />}
        autoCapitalize="none"
        name="email"
        label="E-mail"
        autoComplete="new-password"
        error={errors?.email}
        autoFocus
      />

      <Field
        placeholder="********"
        autoComplete="false"
        prefix={<LockOutlined />}
        name="password"
        label="Senha"
        type="password"
        error={errors?.password}
      />
      <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
      <StyledButton type="primary" htmlType="submit" loading={loading}>
        Entrar
      </StyledButton>
      <FirstAccess href="#">Meu primeiro acesso</FirstAccess>
    </Container>
  );
};

export default FormLogin;
