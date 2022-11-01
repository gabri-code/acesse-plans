import {
  LockFilled,
  MailFilled,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ErrorMessage, Formik, FormikFormProps, FormikProps } from 'formik';
import { FC, useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import { Avatar, message, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import {
  Container,
  StyledInput,
  StyledInputPassword,
  StyledNextButton,
  StyledSelect,
  StyledUpload,
  WraperUploadField,
  WrapInput,
} from './style';
import { StyledErrorMessage } from '../Field/style';
import { UserRegisterContext } from '../../contexts/UserRegisterContext';

interface IFormUserData extends FormikFormProps {
  handleFinishStep: () => void;
}

export interface UserDataValues {
  password: string;
  passwordConfirmation: string;
  fullName: string;
  picture: string;
}

const initialValues: UserDataValues = {
  password: '',
  passwordConfirmation: '',
  picture: '',
  fullName: '',
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const FormRegisterUserData: FC<IFormUserData> = ({
  handleFinishStep,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const { preUser, handleDataRegister } = useContext(UserRegisterContext);

  const ref = useRef<FormikProps<UserDataValues>>(null);

  const Schema = yup.object().shape({
    password: yup
      .string()
      .min(6, ({ min }) => `Senha deve ter pelo menos ${min} caracteres.`)
      .required('Por favor, insira uma senha.'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas não conferem.')
      .required('Por favor, confirme sua senha.'),
    picture: yup.string().required('Por favor, insira uma foto de perfil.'),
    fullName: yup
      .string()
      .required('Por favor, insira seu nome completo.')
      .test('len', 'Por favor, insira seu nome completo.', (value) =>
        value ? value?.trim().split(' ').length > 1 : true
      ),
  });

  const handleSubmit = (values: UserDataValues) => {
    handleDataRegister({
      password: values.password,
      picture: values.picture,
      fullName: values.fullName,
      email: preUser?.email,
      role: preUser?.role,
    });
    handleFinishStep();
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);

        if (ref.current) ref.current.setFieldValue('picture', url);
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
      validateOnMount={false}
      innerRef={ref}
    >
      {() => (
        <Container {...props} layout="vertical">
          <WraperUploadField direction="vertical">
            <StyledUpload
              name="picture"
              listType="picture-card"
              // className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              style={{
                borderRadius: '50%',
              }}
            >
              {imageUrl ? (
                <Avatar
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Avatar size={100} icon={<UserOutlined />} />
              )}
            </StyledUpload>
            <ErrorMessage
              name="picture"
              render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            />
          </WraperUploadField>
          <WrapInput name="fullName" label="Nome completo">
            <StyledInput
              name="fullName"
              placeholder="João da Silva"
              prefix={<UserOutlined />}
            />
          </WrapInput>
          <WrapInput name="preEmail" label="E-mail">
            <StyledInput
              autoCapitalize="none"
              name="preEmail"
              value={preUser?.email}
              prefix={<MailFilled />}
              disabled
            />
          </WrapInput>
          <WrapInput name="password" label="Senha">
            <StyledInputPassword
              autoCapitalize="none"
              name="password"
              placeholder="******"
              prefix={<LockFilled />}
            />
          </WrapInput>
          <WrapInput name="passwordConfirmation" label="Confirmar senha">
            <StyledInputPassword
              autoCapitalize="none"
              name="passwordConfirmation"
              placeholder="******"
              prefix={<LockFilled />}
            />
          </WrapInput>
          <WrapInput name="role" label="Função">
            <StyledSelect
              name="role"
              defaultValue={preUser?.role}
              suffixIcon={<MailFilled />}
              disabled
            />
          </WrapInput>
          <StyledNextButton type="primary" htmlType="submit">
            Próximo
            <RightOutlined />
          </StyledNextButton>
        </Container>
      )}
    </Formik>
  );
};

export default FormRegisterUserData;
