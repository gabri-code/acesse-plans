import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';

interface InputMaskProps extends InputProps {
  mask: 'cpf' | 'phone' | 'cep' | 'bank' | 'birth' | 'currency';
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined
  // ) => void;
}

export const InputMask: FC<InputMaskProps> = ({
  mask,
  name = '',
  // setFieldValue,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleBankInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      let value = currentTarget.value;

      value = value.replace(/\D/g, '').replace(/(.*[0-9])([0-9]$)/, '$1-$2');
      setInputValue(value);
    },
    []
  );

  const handleCurrencyInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      e.currentTarget.value = value
        .replace(/\D/g, '')
        .replace(/\D/g, ' ')
        .replace(/(\d)(\d{2})$/, '$1.$2')
        .replace(/(?=(\d{3})+(\D))\B/g, ' ');

      if (onChange) onChange(e);
    },
    [onChange]
  );

  const handleBirthDateInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      currentTarget.maxLength = 10;
      let value = currentTarget.value;
      // value = value.replace(/\D/g, '');
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d{1,4})/, '$1/$2');

      setInputValue(value);
    },
    []
  );

  const handleCepInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      currentTarget.maxLength = 9;
      let value = currentTarget.value;
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      setInputValue(value);
    },
    []
  );

  const handlePhoneInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      currentTarget.maxLength = 16;
      let value = currentTarget.value;

      if (!value.length) return;

      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');

      setInputValue(value);
    },
    []
  );

  const handleCPFInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      currentTarget.maxLength = 14;
      let value = currentTarget.value;
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
      setInputValue(value);
    },
    []
  );

  const maskFunctions = {
    cpf: handleCPFInput,
    phone: handlePhoneInput,
    cep: handleCepInput,
    bank: handleBankInput,
    birth: handleBirthDateInput,
    currency: handleCurrencyInput,
  };

  const callMaskFunction = maskFunctions[mask];

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (props.onChange) props.onChange(event);

  //   if (mask) callMaskFunction(event);
  // };

  return (
    <Input
      {...props}
      // value={inputValue}
      name={name}
      onChange={callMaskFunction}
      onKeyDown={(e) => {
        const isNumber = Number(e.key);

        if (e.ctrlKey || e.metaKey || e.key.length > 1) return;

        if (e.key === ' ' || (e.key !== 'Backspace' && isNaN(isNumber))) {
          e.preventDefault();
        }
      }}
    />
  );
};
