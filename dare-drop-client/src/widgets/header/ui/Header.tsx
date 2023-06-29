import { FC, memo, useCallback } from "react";
import classNames from "classnames";
import cls from "./Header.module.scss";
import { Button } from "@/shared/ui/Button";
import { AuthModal, openAuthForm } from "@/features/auth-form";
import { logout, useUserStore } from "@/entities/user";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = memo((props) => {
  const { className } = props;
  const isAuth = useUserStore().isAuth;

  const onOpenModal = useCallback(() => {
    openAuthForm();
  }, []);

  return (
    <div className={classNames(cls.Header, {}, [className])}>
      {isAuth ? (
        <Button onClick={logout}>Log out</Button>
      ) : (
        <Button onClick={onOpenModal}>Sign up</Button>
      )}
      <AuthModal />
    </div>
  );
});
