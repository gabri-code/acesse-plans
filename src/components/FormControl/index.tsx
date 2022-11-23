import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
} from '@chakra-ui/react';
import React, { HTMLInputTypeAttribute, ReactNode } from 'react';
import PasswordInput from '../InputPassword';

export type FormControlProps = Omit<ChakraFormControlProps, 'label'> & {
  name: string;
  type?: HTMLInputTypeAttribute;
  label: any;
  testid?: string;
  touched?: boolean;
  error?: string;
  hideError?: boolean;
  children?: ReactNode;
  formLabelProps?: FormLabelProps;
  value?: string;
};

export const FormControl = (props: FormControlProps) => {
  const {
    error,
    mb = 4,
    label,
    children,
    hideError,
    name,
    formLabelProps,
    onChange,
    touched,
    value,
    ...rest
  } = props;

  return (
    <ChakraFormControl
      mb={mb}
      isInvalid={touched && !!error}
      name={name}
      {...rest}
    >
      {label && (
        <FormLabel
          fontSize="14px"
          fontFamily="Gilroy-Medium"
          {...formLabelProps}
        >
          {label}
        </FormLabel>
      )}
      {children ? (
        children
      ) : rest.type === 'password' ? (
        <PasswordInput
          inputProps={{
            name,
            onChange,
            value,
          }}
        />
      ) : (
        <Input
          name={name}
          placeholder={rest.placeholder}
          onChange={onChange}
          value={value}
        />
      )}
      {hideError ? null : <FormErrorMessage>{error}</FormErrorMessage>}
    </ChakraFormControl>
  );
};
