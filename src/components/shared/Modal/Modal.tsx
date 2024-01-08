import React from 'react';
import { Modal, Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';

interface IModal {
  onClose: () => void;
  success: boolean;
}

const MyModal: React.FC<IModal> = ({ onClose, success }) => {
  return (
    <Modal
      yOffset="30vh"
      xOffset={0}
      mt="md"
      size="auto"
      onClose={onClose}
      opened={true}
      withCloseButton={false}
    >
      <Flex
        mih={150}
        miw={250}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Modal.Title>
          {success ? 'Форма успешно отправлена.' : 'Что-то пошло не так.'}
        </Modal.Title>
        {success ? (
          <IconCircleCheckFilled style={{ color: '#0caf49' }} size={48} />
        ) : (
          <IconCircleXFilled style={{ color: '#b31220' }} size={48} />
        )}
        <Link to="/">
          <Button onClick={onClose}>Закрыть</Button>
        </Link>
      </Flex>
    </Modal>
  );
};
export default MyModal;
