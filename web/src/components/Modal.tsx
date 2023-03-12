import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
// React
import { ReactNode } from "react";
// Icones
import { AiOutlineCloseSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
// Cores
import { colors } from "../utils/colors";

interface IDefaultModal {
  props: {
    isOpen: boolean;
    isEdit: boolean;
    onOpen: () => void;
    onClose: () => void;
    action: () => void;
    name: string;
  };
  children: ReactNode;
}

const DefaultModal = ({ props, children }: IDefaultModal) => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={"lg"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", colors.graySky)}>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              leftIcon={props.isEdit ? <FiEdit /> : <AiOutlinePlusSquare />}
              onClick={props.action}
            >
              Salvar
            </Button>
            <Button
              onClick={props.onClose}
              leftIcon={<AiOutlineCloseSquare />}
              colorScheme="gray"
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DefaultModal;
