import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Spinner
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Spiner = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const loading = useSelector((state) => state.appReducer.isLoading);

  useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xs"}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent
        w={"0%"}
        textAlign={"center"}
        m={"auto"}
        alignContent={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="white"
          color="blue.500"
          size="xl"
        />
      </ModalContent>
    </Modal>
  );
};

export default Spiner;
