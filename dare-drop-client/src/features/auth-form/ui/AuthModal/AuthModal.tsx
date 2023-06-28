import { FC, memo, useCallback, useState } from "react";
import classNames from "classnames";
import { Modal } from "@/shared/ui/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import RegisterForm from "../RegisterForm/RegisterForm";
import { Tabs } from "@/shared/ui/Tabs";
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async";

interface AuthModalProps {
  className?: string;
  onCloseModal?: () => void;
  onSuccess?: (args: { accessToken: string }) => void;
  isModalOpen?: boolean;
}

const options = [
  { content: "Sign up", value: "signup" },
  { content: "Sign in", value: "signin" },
];

export const AuthModal: FC<AuthModalProps> = memo((props) => {
  const { className, isModalOpen, onCloseModal, onSuccess } = props;
  const [activeTab, setActiveTab] = useState(options[0]["value"]);

  const onChangeTab = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      lazy
      onClose={onCloseModal}
      className={classNames("", {}, [className])}
    >
      <Tabs options={options} activeOption={activeTab} onChange={onChangeTab} />

      {activeTab === "signin" ? (
        <LoginFormAsync onSuccess={onSuccess} />
      ) : (
        <RegisterFormAsync />
      )}
    </Modal>
  );
});
