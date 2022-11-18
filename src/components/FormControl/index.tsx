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
  type: HTMLInputTypeAttribute;
  label: any;
  testid?: string;
  touched?: boolean;
  error?: string;
  hideError?: boolean;
  children?: ReactNode;
  formLabelProps?: FormLabelProps;
};

export const FormControl = (props: FormControlProps) => {
  const {
    error,
    my = 4,
    label,
    children,
    hideError,
    name,
    formLabelProps,
    onChange,
    touched,
    ...rest
  } = props;

  return (
    <ChakraFormControl
      my={my}
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
          }}
        />
      ) : (
        <Input name={name} placeholder={rest.placeholder} onChange={onChange} />
      )}
      {hideError ? null : <FormErrorMessage>{error}</FormErrorMessage>}
    </ChakraFormControl>
  );
};
