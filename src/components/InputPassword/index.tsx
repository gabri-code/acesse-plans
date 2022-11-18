import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface PasswordProps {
  inputProps?: InputProps;
}

const PasswordInput: FC<PasswordProps> = ({ inputProps }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="2rem"
        type={show ? 'text' : 'password'}
        placeholder="&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;"
        {...inputProps}
      />
      <InputRightElement width="2rem">
        <IconButton
          variant="ghost"
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          aria-label="show or hide password"
        >
          {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
