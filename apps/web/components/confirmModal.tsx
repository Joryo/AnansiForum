import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalBody,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  title,
  message,
  onConfirm,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <Button color="success" onPress={onConfirm}>
                Confirm
              </Button>
              <Button color={"danger"} onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
