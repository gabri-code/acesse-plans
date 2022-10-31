import { ErrorMessage } from 'formik';
import { InputProps } from 'rc-input';
import { FC, ReactNode } from 'react';
import {
  Container,
  InputLabel,
  StyledErrorMessage,
  StyledField,
  WrapInput,
} from './style';

interface IField extends InputProps {
  name: string;
  label: string;
  error?: string;
  prefix?: ReactNode;
  bordered?: boolean | false;
  transparent?: boolean | false;
}

const InputField: FC<IField> = ({
  name,
  label,
  placeholder,
  type,
  prefix,
  bordered,
  transparent,
  ...props
}) => {
  return (
    <Container direction="vertical">
      <InputLabel>{label}</InputLabel>
      <WrapInput bordered={bordered} transparent={transparent}>
        {prefix}
        <StyledField
          type={type}
          placeholder={placeholder}
          name={name}
          transparent={transparent}
          {...props}
        />
      </WrapInput>
      <ErrorMessage
        name={name}
        render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
      />
    </Container>
  );
};

export default InputField;
