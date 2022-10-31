import { FormikErrors, FormikFormProps } from 'formik';
import { FC } from 'react';
import { MdEmail, MdFactCheck } from 'react-icons/md';
import Router from 'next/router';
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
import { Role } from '../../types';

interface IFormPreRegister extends FormikFormProps {
  errors?: FormikErrors<{
    email: string;
    roles: Role[];
  }>;
  loading?: boolean;
}

const FormPreRegister: FC<IFormPreRegister> = ({ loading, ...props }) => {
  return (
    <Container {...props} layout="vertical">
      <FormTitle level={4}>Cadastrar novo usuário</FormTitle>
      <Container.Item name="email" label="E-mail">
        <StyledInput name="email" prefix={<MdEmail />} />
      </Container.Item>
      <Container.Item name="roles" label="Função">
        <StyledSelect name="roles" suffixIcon={<MdFactCheck />} mode="multiple">
          {roles.map((role) => (
            <StyledSelect.Option key={role} value={role}>
              {rolesPT[role]}
            </StyledSelect.Option>
          ))}
        </StyledSelect>
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
