import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Typography } from 'antd';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import styles from '../../styles/SignIn.module.scss';
import { UserLogin } from '../../types';

const { Link } = Typography;

const SignInPage = () => {
  const { signIn } = useContext(AuthContext);

  const [form] = Form.useForm();

  const onFinish = async (values: UserLogin) => {
    console.log('Success:', values);
    const response = await signIn(values);

    console.log(!!response);

    if (!!response) {
      form.setFields([
        {
          name: 'email',
          errors: [response.error],
        },
      ]);
    }
  };

  return (
    <>
      <Head>
        <title>Entrar na minha conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['signin-page']}>
        <div className={styles['form-wraper']}>
          <Image
            src="/images/logo.png"
            alt="logo"
            className={styles.logo}
            preview={false}
          />
          <Form
            name="loginForm"
            layout="vertical"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className={styles['form-login']}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira seu e-mail.',
                },
                {
                  type: 'email',
                  message: 'Por favor, insira um e-mail válido.',
                },
              ]}
              className={styles['wrap-input']}
              wrapperCol={{ sm: 24 }}
            >
              <Input
                placeholder="joão@acesse.com.br"
                prefix={<UserOutlined />}
                autoCapitalize="none"
                autoComplete="off"
                size="large"
                bordered={false}
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                { required: true, message: 'Por favor, insira sua senha!' },
              ]}
              wrapperCol={{ sm: 24 }}
              className={styles['wrap-input']}
            >
              <Input.Password
                placeholder="********"
                autoComplete="password"
                prefix={<LockOutlined />}
                bordered={false}
              />
            </Form.Item>
            <Link href="#" className={styles['forgot-link']}>
              Esqueci minha senha
            </Link>
            <Form.Item className={styles['form-btn-container']}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles['button-submit']}
              >
                Entrar
              </Button>
            </Form.Item>
            <Link href="#" className={styles['first-access']}>
              Meu primeiro acesso
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
