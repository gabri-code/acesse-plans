import { Formik, FormikFormProps, FormikProps, useFormikContext } from 'formik';
import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  CalendarFilled,
  CheckCircleOutlined,
  HomeFilled,
  NumberOutlined,
  PhoneFilled,
} from '@ant-design/icons';
import { Checkbox, Col, Input, Modal, Row, Typography } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Router from 'next/router';
import {
  Container,
  StyledFieldSet,
  StyledInput,
  StyledNextButton,
  WrapInput,
} from './style';
import validateCPF from '../../utils/validateCPF';
import { GET_LOCATION_QUERY } from '../../graphql/queries/getLocation';
import { UserRegisterContext } from '../../contexts/UserRegisterContext';
import { InputMask } from '../InputMask';
import { SIGNUP_MUTATION } from '../../graphql/mutations/user/signup';

type IFormValidation = FormikFormProps;

export interface PersonalDataValues {
  cpf: string;
  birthDay: string;
  city: string;
  houseNumber: string;
  cep: string;
  phone: string;
  street: string;
  district: string;
  complement: string;
  // bank: string;
  // ac: string;
  // acDigit: string;
  // cc: string;
  // ccDigit: string;
}

const initialValues: PersonalDataValues = {
  cpf: '',
  birthDay: '',
  city: '',
  houseNumber: '',
  phone: '',
  cep: '',
  street: '',
  district: '',
  complement: '',
  // bank: '',
  // ac: '',
  // acDigit: '',
  // cc: '',
  // ccDigit: '',
};

const phoneRegExp = /^\(\d{2}\) 9 \d{4}-\d{4}/;

const zipRegExp = /^[0-9]{5}-[0-9]{3}$/;

const FormPersonalData: FC<IFormValidation> = ({ ...props }) => {
  const [getLocation] = useLazyQuery(GET_LOCATION_QUERY);
  const { dataRegister } = useContext(UserRegisterContext);
  const { setFieldValue } = useFormikContext();

  const [confirmedData, setConfirmedData] = useState(false);

  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);

  const RegisterValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .required('Telefone é obrigatório.')
      .matches(phoneRegExp, 'Formato de telefone inválido.'),
    cpf: yup
      .string()
      .required('CPF é obrigatório.')
      .test('valid', 'CPF inválido.', (value) => {
        if (value) {
          return validateCPF(
            value?.replaceAll('.', '').replace('-', '') as string
          );
        }
        return true;
      }),
    street: yup.string().required('Logradouro é obrigatório.'),
    houseNumber: yup.string().required('Número da casa é obrigatório.'),
    cep: yup
      .string()
      .required('CEP é obrigatório.')
      .matches(zipRegExp, 'CEP inválido.')
      .test({
        name: 'cepValidation',
        message: 'CEP inválido.',
        test: async (value) => {
          try {
            const cep = (value as string).replace('-', '');
            const {
              data: {
                getCityFromCEP: { data },
              },
            } = await getLocation({
              variables: {
                cep,
              },
            });

            return !!data;
          } catch (e) {
            return false;
          }
        },
      }),
    district: yup.string().required('Bairro é obrigatório.'),
    birthDay: yup
      .string()
      .required('Data de nascimento é obrigatório.')
      .test('dateFormat', 'Data inválida.', (value) => {
        if (value) {
          const parsedDate = parse(value, 'P', new Date(), { locale: ptBR });
          return isValid(parsedDate);
        }
        return !!value;
      }),
    // bank: yup.string().required('Banco é obrigatório.'),
    // ac: yup.string().required('Conta é obrigatório.'),
    // acDigit: yup.string().required('Dígito é obrigatório.'),
    // cc: yup.string().required('Agência é obrigatório.'),
    // ccDigit: yup.string().required('Dígito é obrigatório.'),
  });

  const ref = useRef<FormikProps<PersonalDataValues>>(null);

  const getCityByCEP = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const cep = target.value.replace('-', '');

    if (cep.length === 8) {
      const {
        data: {
          getCityFromCEP: { data, error },
        },
      } = await getLocation({
        variables: {
          cep,
        },
      });

      if (error) {
        return;
      }

      if (data) {
        const { Municipio, Uf } = data;
        ref.current?.setFieldValue('city', `${Municipio} - ${Uf}`);
      }
    }
  };

  // const showConfirm = () => {
  //   info({
  //     title: 'Confira se todos seus dados estão corretos.',
  //     icon: <ExclamationCircleOutlined />,
  //     centered: true,
  //     content: (

  //     ),
  //     onOk() {
  //       console.log('OK');
  //     },
  //     okText: 'Concluir',
  //     closable: true,
  //     closeIcon: <CloseCircleOutlined />,

  //   });
  // };

  const handleSubmit = async () => {
    const personalData = ref.current?.values;

    const userData = {
      fullName: dataRegister?.fullName ?? '',
      address: `${personalData?.street}, ${personalData?.houseNumber}${
        personalData?.complement ? `, ${personalData.complement} -` : ' -'
      } ${personalData?.district} - ${personalData?.city}, ${
        personalData?.cep
      }`,
      cpf: personalData?.cpf ?? '',
      email: dataRegister?.email ?? '',
      password: dataRegister?.password ?? '',
      phone: personalData?.phone ?? '',
      picture: dataRegister?.picture ?? '',
      role: dataRegister?.role ?? 'indicator',
      birthDay: parse(
        personalData?.birthDay as string,
        'dd/MM/yyyy',
        new Date()
      ),
      // bank: personalData?.bank ?? '',
      // bankAccount: `${personalData?.cc}-${personalData?.ccDigit}` ?? '',
      // bankAgency: `${personalData?.ac}-${personalData?.acDigit}` ?? '',
    };

    console.log(userData);

    try {
      const {
        data: {
          signUp: { data, error },
        },
      } = await signUp({
        variables: {
          data: userData,
        },
      });

      if (error) {
        ref.current?.setFieldError(error.field, error.message);
        return;
      }

      if (data) {
        Router.push('/signin');
      }
    } catch (e) {
      console.log(e);
    }

    // showModal();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidationSchema}
        validateOnMount={false}
        innerRef={ref}
      >
        {() => (
          <Container {...props} layout="vertical">
            <Input.Group>
              <Row gutter={8}>
                <Col style={{ width: 'calc(100% / 3)' }}>
                  <WrapInput name="phone" label="Telefone" required>
                    <InputMask
                      // prefix={<PhoneFilled />}
                      type="tel"
                      name="phone"
                      placeholder="(32) 9 1234-5678"
                      mask="phone"
                    />
                  </WrapInput>
                </Col>
                <Col style={{ width: 'calc(100% / 3)' }}>
                  <WrapInput name="cpf" label="CPF" required>
                    <InputMask
                      mask="cpf"
                      placeholder="123.456.789-10"
                      name="cpf"
                      // prefix={<NumberOutlined />}
                    />
                  </WrapInput>
                </Col>
                <Col style={{ width: 'calc(100% / 3)' }}>
                  <WrapInput
                    name="birthDay"
                    label="Data de nascimento"
                    required
                  >
                    <InputMask
                      mask="birth"
                      placeholder="10/01/1990"
                      name="birthDay"
                      // prefix={<CalendarFilled />}
                    />
                  </WrapInput>
                </Col>
              </Row>
            </Input.Group>
            <StyledFieldSet>
              <legend>
                <HomeFilled /> Endereço
              </legend>
              <Row gutter={8}>
                <Col style={{ width: '80%' }}>
                  <WrapInput name="street" label="Logradouro" required>
                    <StyledInput name="street" suffix={<span />} />
                  </WrapInput>
                </Col>
                <Col style={{ width: '20%' }}>
                  <WrapInput name="houseNumber" label="Número" required>
                    <StyledInput
                      type="number"
                      name="houseNumber"
                      suffix={<span />}
                    />
                  </WrapInput>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col style={{ width: '60%' }}>
                  <WrapInput name="complement" label="Complemento">
                    <StyledInput name="complement" suffix={<span />} />
                  </WrapInput>
                </Col>
                <Col style={{ width: '40%' }}>
                  <WrapInput name="district" label="Bairro" required>
                    <StyledInput name="district" suffix={<span />} />
                  </WrapInput>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col style={{ width: '50%' }}>
                  <WrapInput name="city" label="Cidade">
                    <StyledInput name="city" disabled suffix={<span />} />
                  </WrapInput>
                </Col>
                <Col style={{ width: '50%' }}>
                  <WrapInput name="cep" label="CEP" required>
                    <InputMask
                      name="cep"
                      mask="cep"
                      placeholder="36830-000"
                      // suffix={<span />}
                      onChange={getCityByCEP}
                    />
                  </WrapInput>
                </Col>
              </Row>
            </StyledFieldSet>
            {/* <StyledFieldSet>
              <legend>
                <DollarOutlined /> Dados bancários
              </legend>
              <WrapInput name="bank">
                <StyledSelect
                  name="bank"
                  suffixIcon={<BankFilled />}
                  placeholder="Selecione seu banco"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {banks.map((bank) => (
                    <StyledSelect.Option key={bank.LongName}>
                      {`${bank.COMPE} - ${bank.LongName}`}
                    </StyledSelect.Option>
                  ))}
                </StyledSelect>
              </WrapInput>
              <Row gutter={8}>
                <Col style={{ width: '50%' }}>
                  <Row gutter={8}>
                    <Col style={{ width: '70%' }}>
                      <WrapInput name="cc" label="Agência" required>
                        <StyledInput
                          name="cc"
                          type="number"
                          prefix={<NumberOutlined />}
                        />
                      </WrapInput>
                    </Col>
                    <Col style={{ width: '30%' }}>
                      <WrapInput name="ccDigit" label="Dígito" required>
                        <StyledInput
                          maxLength={1}
                          name="ccDigit"
                          prefix={<span />}
                          type="number"
                        />
                      </WrapInput>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ width: '50%' }}>
                  <Row gutter={8}>
                    <Col style={{ width: '70%' }}>
                      <WrapInput name="ac" label="Conta" required>
                        <StyledInput
                          name="ac"
                          type="number"
                          prefix={<NumberOutlined />}
                        />
                      </WrapInput>
                    </Col>
                    <Col style={{ width: '30%' }}>
                      <WrapInput name="acDigit" label="Dígito" required>
                        <StyledInput
                          maxLength={1}
                          name="acDigit"
                          type="number"
                          prefix={<span />}
                        />
                      </WrapInput>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </StyledFieldSet> */}
            <Checkbox
              onChange={() => setConfirmedData((prev) => !prev)}
              disabled={confirmedData}
            >
              Confirmo que meus dados estão corretos.
            </Checkbox>
            <StyledNextButton
              type="primary"
              htmlType="submit"
              // loading={registerCodeLoading}
              disabled={!confirmedData}
              loading={loading}
            >
              Finalizar
              <CheckCircleOutlined />
            </StyledNextButton>
          </Container>
        )}
      </Formik>
      {/* <Modal
        open={open}
        title="Confirme seus dados"
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Editar dados
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!confirmedData}
          >
            Confirmar
          </Button>,
        ]}
      > */}
      {/* <Space direction="vertical"> */}
      {/* <StyledFieldSet style={{ display: 'flex', flexDirection: 'column' }}>
            <Title underline style={{ fontSize: '16px ' }}>
              Conta
            </Title>
            <Text editable>
              <b>E-mail: </b>
              {dataRegister?.email}
            </Text>
            <Text>
              <b>Senha: </b>
              {dataRegister?.password}
              <EyeInvisibleFilled />
            </Text>
          </StyledFieldSet> */}
      {/* <StyledFieldSet style={{ display: 'flex', flexDirection: 'column' }}>
            <Title underline style={{ fontSize: '16px ' }}>
              Dados pessoais
            </Title>
            <Text>
              <b>Nome completo: </b>
              {dataRegister?.fullName}
            </Text>
            <Text>
              <b>CPF: </b>
              {dataRegister?.cpf}
            </Text>
            <Text>
              <b>Telefone: </b>
              {dataRegister?.phone}
            </Text>
            <Text>
              <b>Endereço: </b>
              {dataRegister?.address}
            </Text>
          </StyledFieldSet>
          <StyledFieldSet style={{ display: 'flex', flexDirection: 'column' }}>
            <Title underline style={{ fontSize: '16px ' }}>
              Dados bancários
            </Title>
            <Text>
              <b>Banco: </b>
              {dataRegister?.bank}
            </Text>
            <Text>
              <b>Agência: </b>
              {dataRegister?.bankAgency}
            </Text>
            <Text>
              <b>Conta: </b>
              {dataRegister?.bankAccount}
            </Text>
          </StyledFieldSet>
          <Checkbox onChange={() => setConfirmedData((prev) => !prev)}>
            Confirmo que meus dados estão corretos.
          </Checkbox>
        </Space> */}
      {/* </Modal> */}
    </>
  );
};

export default FormPersonalData;
