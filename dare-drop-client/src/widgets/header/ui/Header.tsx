import { FC, memo, useCallback, useState } from "react";
import classNames from "classnames";
import cls from "./Header.module.scss";
import { Button } from "@/shared/ui/Button";
import { AuthModal } from "@/features/auth-form";
import { setAuthData, useUserStore } from "@/entities/user";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = memo((props) => {
  const { className } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isAuth = useUserStore().isAuth;

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onSuccess = useCallback(
    ({ accessToken }: { accessToken: string }) => {
      onCloseModal();
      setAuthData({ accessToken });
    },
    [onCloseModal]
  );

  return (
    <div className={classNames(cls.Header, {}, [className])}>
      {isAuth ? "User is auth" : <Button onClick={onOpenModal}>Sign up</Button>}
      <AuthModal
        isModalOpen={isOpenModal}
        onCloseModal={onCloseModal}
        onSuccess={onSuccess}
      />
    </div>
  );
});
