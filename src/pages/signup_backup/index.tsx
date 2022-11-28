import { Steps, Tabs } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import { Status } from 'rc-steps/lib/interface';
import FormRegisterValidation from '../../components/FormRegister/Validation';

import styles from '../../styles/SignUp.module.scss';
import FormRegisterUserData from '../../components/FormRegister/UserData';
import { UserRegisterProvider } from '../../contexts/UserRegisterContext';
import FormPersonalData from '../../components/FormRegister/PersonalData';

const { Step } = Steps;

export interface FormRegisterValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  picture: string;
  address: string;
  phone: string;
}

interface StepsStatus {
  1: Status;
  2: Status;
  3: Status;
}

const SignUpPage = () => {
  const [current, setCurrent] = useState(1);
  const [stepsStatus, setStepsStatus] = useState<StepsStatus>({
    1: 'process',
    2: 'wait',
    3: 'wait',
  });

  const handleFinishStep = () => {
    setCurrent((prev) => prev + 1);
    setStepsStatus((prev) => ({
      ...prev,
      [current]: 'finish',
      [current + 1]: 'process',
    }));
  };

  return (
    <UserRegisterProvider>
      <Head>
        <title>Criar conta</title>
        <meta name="description" content="SignIn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['signup-page']}>
        <div className={styles['progress-bar']}>
          <Steps
            // type="navigation"
            size="small"
            current={current}
            // onChange={onChange}
            className="site-navigation-steps"
            labelPlacement="vertical"
            // progressDot={customDot}
          >
            <Step
              title="VALIDAR CÓDIGO DE REGISTRO"
              // description="Cheque o código recebido no seu e-mail."
              status={stepsStatus[1]}
            />
            <Step
              title="CONFIGURAÇÕES DA CONTA"
              // description="Configuar seu usuário."
              status={stepsStatus[2]}
            />
            <Step
              title="DADOS PESSOAIS"
              // description="Cadastrar seu endereço."
              status={stepsStatus[3]}
            />
          </Steps>
        </div>
        <Tabs
          defaultActiveKey={String(current)}
          tabBarStyle={{
            display: 'none',
          }}
          activeKey={String(current)}
          tabPosition="top"
          items={[
            {
              label: '',
              key: '1',
              animated: true,
              children: (
                <FormRegisterValidation handleFinishStep={handleFinishStep} />
              ),
            },
            {
              label: `Tab 2`,
              key: '2',
              animated: true,
              children: (
                <FormRegisterUserData handleFinishStep={handleFinishStep} />
              ),
            },
            {
              label: `Tab 3`,
              key: '3',
              animated: true,
              children: <FormPersonalData />,
            },
          ]}
        />
      </div>
    </UserRegisterProvider>
  );
};

export default SignUpPage;
