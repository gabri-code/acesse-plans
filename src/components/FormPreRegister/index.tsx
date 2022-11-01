import { FormikFormProps } from 'formik';
import { FC } from 'react';
import { MdEmail, MdFactCheck } from 'react-icons/md';
import Router from 'next/router';
import { Radio } from 'formik-antd';
import {
  Container,
  FormTitle,
  StyledButtonGroup,
  StyledCancelButton,
  StyledInput,
  StyledSaveButton,
  StyledSelect,
} from './style';
import roles from '../../utils/roles';
import { rolesPT } from '../../pages/gerenciamento-usuarios';

interface IFormPreRegister extends FormikFormProps {
  loading?: boolean;
}

const FormPreRegister: FC<IFormPreRegister> = ({ loading, ...props }) => {
  return (
    <Container {...props} layout="vertical">
      <FormTitle level={4}>Cadastrar novo usuário</FormTitle>
      <Container.Item name="email" label="E-mail">
        <StyledInput name="email" prefix={<MdEmail />} />
      </Container.Item>
      <Container.Item name="role" label="Função">
        <Radio.Group
          name="role"
          defaultValue="indicator"
          style={{ display: 'flex', gap: 10 }}
        >
          <Radio.Button value="indicator">Indicador</Radio.Button>
          <Radio.Button value="admin">Administrador</Radio.Button>
        </Radio.Group>
      </Container.Item>
      <StyledButtonGroup>
        <StyledCancelButton
          danger
          onClick={() => Router.push('/gerenciamento-usuarios')}
        >
          Cancelar
        </StyledCancelButton>
        <StyledSaveButton type="primary" loading={loading}>
          Salvar
        </StyledSaveButton>
      </StyledButtonGroup>
    </Container>
  );
};

export default FormPreRegister;
