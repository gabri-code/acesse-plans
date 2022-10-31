import { MailFilled, NumberOutlined } from '@ant-design/icons';
import {
  Formik,
  FormikErrors,
  FormikFormProps,
  FormikHelpers,
  FormikProps,
} from 'formik';
import { FC, useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Container, StyledInput, StyledNextButton, WrapInput } from './style';
import { FormRegisterValues } from '../../pages/signup';
import { PRE_SIGNUP_VERIFICATION_MUTATION } from '../../graphql/mutations/user/preRegister';
import { UserRegisterContext } from '../../contexts/UserRegisterContext';

interface IFormValidation extends FormikFormProps {
  errors?: FormikErrors<FormRegisterValues>;
  handleFinishStep: () => void;
}

export interface ValidationValues {
  email: string;
  otpUser: string;
  otp: string;
}

const initialValues: ValidationValues = {
  email: '',
  otpUser: '',
  otp: '',
};

const FormRegisterValidation: FC<IFormValidation> = ({
  handleFinishStep,
  ...props
}) => {
  const [otpRegisterValidated, setOtpRegisterValidated] = useState(false);
  const { handlePreUser } = useContext(UserRegisterContext);

  const [preSignUpVerification, { loading: registerCodeLoading }] = useMutation(
    PRE_SIGNUP_VERIFICATION_MUTATION
  );

  const RegisterValidationSchema = yup.object().shape({
    otpUser: yup.number().required('Por favor, insira seu código de registro.'),
    email: yup
      .string()
      .email('Por favor, insira um email válido.')
      .required('Por favor, insira um email.'),
    ...(otpRegisterValidated && {
      otp: yup
        .number()
        .required(
          'Por favor, insira o código de validação enviado no seu e-mail.'
        ),
    }),
  });

  const ref = useRef<FormikProps<ValidationValues>>(null);

  const preSignUpVerificationSubmit = async (
    values: ValidationValues,
    { setErrors }: FormikHelpers<ValidationValues>
  ) => {
    const {
      data: { preSignUpVerification: response },
    } = await preSignUpVerification({
      variables: {
        data: { email: values.email, otpUser: String(values.otpUser) },
      },
    });

    if (response.status === 'FAILED') {
      setErrors({ [response.field]: response.message });
      return false;
    }

    handlePreUser(response.data);

    setOtpRegisterValidated(true);
    handleFinishStep();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSignUpVerificationSubmit}
      validationSchema={RegisterValidationSchema}
      validateOnMount={false}
      innerRef={ref}
    >
      {() => (
        <Container {...props} layout="vertical">
          <WrapInput name="email" label="E-mail">
            <StyledInput
              autoCapitalize="none"
              name="email"
              placeholder="joão@acesse.com.br"
              prefix={<MailFilled />}
              disabled={otpRegisterValidated}
            />
          </WrapInput>
          <WrapInput name="otpUser" label="Código de registro">
            <StyledInput
              name="otpUser"
              placeholder="1234"
              prefix={<NumberOutlined />}
              type="number"
              maxLength={4}
              disabled={otpRegisterValidated}
            />
          </WrapInput>
          <StyledNextButton
            type="primary"
            htmlType="submit"
            loading={registerCodeLoading}
          >
            Validar usuário
          </StyledNextButton>
        </Container>
      )}
    </Formik>
  );
};

export default FormRegisterValidation;
