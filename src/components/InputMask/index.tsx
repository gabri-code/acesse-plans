import { InputProps } from 'formik-antd';
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { StyledInput } from './style';

interface InputMaskProps extends InputProps {
  mask: 'cpf' | 'phone' | 'cep' | 'bank' | 'birth';
}

export const InputMask: FC<InputMaskProps> = ({ mask, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  const handleBankInput = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) => {
      let value = currentTarget.value;

      value = value.replace(/\D/g, '').replace(/(.*[0-9])([0-9]$)/, '$1-$2');
      setInputValue(value);
    },
    []
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
  };

  const callMaskFunction = maskFunctions[mask];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('chamou');
    if (props.onChange) props.onChange(event);

    if (mask) callMaskFunction(event);
  };

  return (
    <StyledInput
      {...props}
      value={inputValue}
      onChange={handleChange}
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
