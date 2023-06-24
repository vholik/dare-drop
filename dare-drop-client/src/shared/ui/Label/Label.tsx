import { FC, ReactNode, memo } from "react";
import cls from "./Label.module.scss";
import classNames from "classnames";

interface LabelProps {
  className?: string;
  label: string;
  children?: ReactNode;
}

export const Label: FC<LabelProps> = memo((props) => {
  const { className, label, children } = props;

  return (
    <label className={cls.Label}>
      {label}
      {children}
    </label>
  );
});
