import {
  Avatar,
  AvatarProps,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';

interface CustomAvatarProps extends AvatarProps {
  modePreview?: 'tooltip' | 'modal';
}

export const CustomAvatar: FC<CustomAvatarProps> = ({
  modePreview,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        label={<Image src={rest.src} alt="user picture" />}
        {...(modePreview !== 'tooltip' && { isDisabled: true })}
        p={0}
        placement="right"
        overflow="hidden"
        borderRadius="15px"
        bg="transparent"
      >
        <IconButton
          aria-label="avatar"
          variant="ghost"
          {...(modePreview === 'modal' && { onClick: onOpen })}
          borderRadius="50%"
        >
          <Avatar {...rest} />
        </IconButton>
      </Tooltip>

      {modePreview === 'modal' && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={0}>
              <Image src={rest.src} alt="user picture" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
