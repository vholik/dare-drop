import { ButtonHTMLAttributes, FC, ReactNode, memo } from "react";
import classNames from "classnames";
import cls from "./Button.module.scss";
import { Loader } from "../Loader";

type ButtonTheme = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  square?: boolean;
  theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    isLoading,
    square,
    theme = "primary",
    ...otherProps
  } = props;

  const content = isLoading ? <Loader /> : children;

  return (
    <button
      className={classNames(
        cls.Button,
        {
          [cls.loading]: isLoading,
          [cls.square]: square,
        },
        [className, cls[theme]]
      )}
      {...otherProps}
    >
      {content}
    </button>
  );
});
