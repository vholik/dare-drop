import { FC, memo, useCallback, useState } from "react";
import classNames from "classnames";
import { Modal } from "@/shared/ui/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Tabs } from "@/shared/ui/Tabs";
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async";
import { setAuthData } from "@/entities/user";
import { closeAuthForm, useAuthFormStore } from "../..";

interface AuthModalProps {
  className?: string;
}

const options = [
  { content: "Sign up", value: "signup" },
  { content: "Sign in", value: "signin" },
];

export const AuthModal: FC<AuthModalProps> = memo((props) => {
  const { className } = props;
  const [activeTab, setActiveTab] = useState(options[0]["value"]);
  const isModalOpen = useAuthFormStore().isOpen;

  const onCloseModal = useCallback(() => {
    closeAuthForm();
  }, []);

  const onChangeTab = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const onSuccess = useCallback(
    ({ accessToken }: { accessToken: string }) => {
      onCloseModal();
      setAuthData({ accessToken });
    },
    [onCloseModal]
  );

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
        <RegisterFormAsync onSuccess={onSuccess} />
      )}
    </Modal>
  );
});
