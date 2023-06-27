import { FC, memo } from "react";
import classNames from "classnames";
import { Modal } from "@/shared/ui/Modal";
import { AuthForm } from "../AuthForm/AuthForm";

interface AuthModalProps {
  className?: string;
  onCloseModal?: () => void;
  onSuccess?: (args: { accessToken: string }) => void;
  isModalOpen?: boolean;
}

export const AuthModal: FC<AuthModalProps> = memo((props) => {
  const { className, isModalOpen, onCloseModal, onSuccess } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      lazy
      onClose={onCloseModal}
      className={classNames("", {}, [className])}
    >
      <AuthForm onSuccess={onSuccess} />
    </Modal>
  );
});
