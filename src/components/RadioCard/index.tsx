import { Box, RadioProps, useRadio } from '@chakra-ui/react';

export const RadioCard = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        boxShadow="md"
        display="flex"
        justifyContent="center"
        bg="rgba(255, 123, 0, 0.3)"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py="10px"
      >
        {props.children}
      </Box>
    </Box>
  );
};
