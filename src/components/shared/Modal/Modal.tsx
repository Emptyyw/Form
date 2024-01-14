import React from 'react';
import { Modal, Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/slices/ModalSlice';
import { RootState } from '../../../redux/store';



const MyModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalSuccess, modalMessage } = useSelector(
    (state: RootState) => state.modal,
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      yOffset="30vh"
      xOffset={0}
      mt="md"
      size="auto"
      onClose={handleClose}
      opened={isModalOpen}
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
        <Modal.Title>{modalMessage}</Modal.Title>
        {modalSuccess ? (
          <IconCircleCheckFilled style={{ color: '#0caf49' }} size={48} />
        ) : (
          <IconCircleXFilled style={{ color: '#b31220' }} size={48} />
        )}
        <Link to="/">
          <Button onClick={handleClose}>Закрыть</Button>
        </Link>
      </Flex>
    </Modal>
  );
};

export default MyModal;
