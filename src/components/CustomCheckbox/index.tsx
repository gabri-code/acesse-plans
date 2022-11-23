import { Box, Text, useCheckbox, CheckboxProps } from '@chakra-ui/react';

export default function CustomCheckbox(props: CheckboxProps) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <Box
      as="label"
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      bg="green.50"
      border="1px solid"
      borderColor="green.500"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
      {...getCheckboxProps()}
      _checked={{
        bg: 'teal.600',
        color: 'white',
        borderColor: 'teal.600',
      }}
    >
      <input {...getInputProps()} hidden />
      {props.children}
    </Box>
  );
}
