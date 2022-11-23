import {
  Box,
  BoxProps,
  InputProps,
  RadioProps,
  useCheckbox,
  useRadio,
  UseCheckboxProps,
} from '@chakra-ui/react';

interface Props extends RadioProps {
  extraStyle?: BoxProps;
  type: 'radio' | 'checkbox';
}

export const RadioCard = ({ extraStyle, type, ...props }: Props) => {
  const inputRadio = useRadio(props);
  const inputCheckbox = useCheckbox(props as UseCheckboxProps);

  const input =
    type === 'radio'
      ? inputRadio.getInputProps()
      : inputCheckbox.getInputProps();
  const checkbox =
    type === 'radio'
      ? inputRadio.getCheckboxProps()
      : inputCheckbox.getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        boxShadow="xs"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(255, 123, 0, 0.3)"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        p="5px 15px"
        {...extraStyle}
      >
        {props.children}
      </Box>
    </Box>
  );
};
